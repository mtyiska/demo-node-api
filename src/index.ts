// index.ts
import http from "http";

import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();

const version = "v1.0.8";

const start = async () => {
  try {
    const port = process.env.API_PORT || 4400; // Default port 3000
    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`API Service listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

start();
