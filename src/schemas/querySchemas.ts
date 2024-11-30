import { z } from "zod";

export const commentsQuerySchema = z.object({
  user: z.string().optional(),
  page: z
    .string() // Parse as string first because Express query params are always strings
    .transform((val) => parseInt(val, 10)) // Transform to integer
    .optional()
    .default("1")
    .refine((val) => val > 0, { message: "Page must be greater than 0" }),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional()
    .default("10")
    .refine((val) => val > 0, { message: "Limit must be greater than 0" }),
});

export const threadsQuerySchema = z.object({
  category: z.string().optional(),
});

export const repliesQuerySchema = z.object({
  threadId: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, {
      message: "threadId must be a positive integer",
    }),
});
