import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateQuery =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query); // Parse and validate query
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      res
        .status(400)
        .send({ message: "Invalid query parameters", errors: err });
    }
  };
