import express, { Request, Response } from "express";
import { json } from "body-parser";
import {
  collectDefaultMetrics,
  Registry,
  Counter,
  Histogram,
  Gauge,
} from "prom-client";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";
import apiRoutes from "./routes/apiRoutes";

const app = express();
const metricsRegistry = new Registry();

// Middleware
app.use(json());

// Register default Prometheus metrics
collectDefaultMetrics({ register: metricsRegistry });

// Load OpenAPI YAML file
const swaggerYaml = fs.readFileSync("./swagger/swaggerSpec.yaml", "utf-8");
const swaggerDocument = YAML.parse(swaggerYaml);

// Swagger UI route
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Custom Prometheus metrics
const requestCounter = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"], // Labels for better granularity
});

const responseTimeHistogram = new Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request latency in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.5, 1, 5, 10], // Latency buckets (in seconds)
});

const errorCounter = new Counter({
  name: "http_errors_total",
  help: "Total number of HTTP errors",
  labelNames: ["method", "route", "status"],
});

const inProgressGauge = new Gauge({
  name: "http_requests_in_progress",
  help: "Number of HTTP requests currently in progress",
  labelNames: ["method", "route"],
});

// Middleware for custom metrics
app.use((req, res, next) => {
  // Increment in-progress requests
  inProgressGauge.inc({
    method: req.method,
    route: req.route?.path || req.url,
  });

  // Track request start time
  const start = Date.now();

  // On request finish
  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000; // Convert ms to seconds

    // Decrement in-progress requests
    inProgressGauge.dec({
      method: req.method,
      route: req.route?.path || req.url,
    });

    // Increment request counter
    requestCounter.inc({
      method: req.method,
      route: req.route?.path || req.url,
      status: res.statusCode,
    });

    // Observe latency in histogram
    responseTimeHistogram.observe(
      {
        method: req.method,
        route: req.route?.path || req.url,
        status: res.statusCode,
      },
      duration
    );

    // Increment error counter for HTTP errors
    if (res.statusCode >= 400) {
      errorCounter.inc({
        method: req.method,
        route: req.route?.path || req.url,
        status: res.statusCode,
      });
    }
  });

  next();
});

// API Routes
app.use("/api", apiRoutes);

// Prometheus metrics endpoint
app.get("/metrics", async (req: Request, res: Response) => {
  res.set("Content-Type", metricsRegistry.contentType);
  res.send(await metricsRegistry.metrics());
});

// 404 for all undefined routes
app.all("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "Route not found" });
});

export { app };
