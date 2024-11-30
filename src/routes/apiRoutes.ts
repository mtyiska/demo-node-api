// routes/apiRoutes.ts
import express, { Request, Response } from "express";
import { getComments, getThreads, getReplies } from "../services/apiService";
import { validateQuery } from "../middleware/validateQuery";
import {
  commentsQuerySchema,
  threadsQuerySchema,
  repliesQuerySchema,
} from "../schemas/querySchemas";

const router = express.Router();

router.get(
  "/comments",
  validateQuery(commentsQuerySchema),
  (req: Request, res: Response) => {
    // Casting req.query to unknown first is necessary because Express types req.query as ParsedQs,
    // which is a very generic type. After Zod validation, we know the shape of req.query,
    // so we safely assert it to the expected type.
    const { user, page, limit } = req.query as unknown as {
      user?: string;
      page: number;
      limit: number;
    };
    const comments = getComments({ user, page, limit });
    res.status(200).send({ data: comments });
  }
);

router.get(
  "/threads",
  validateQuery(threadsQuerySchema),
  (req: Request, res: Response) => {
    const { category } = req.query as unknown as { category?: string };
    const threads = getThreads({ category });
    res.status(200).send({ data: threads });
  }
);

router.get(
  "/replies",
  validateQuery(repliesQuerySchema),
  (req: Request, res: Response) => {
    const { threadId } = req.query as unknown as { threadId: number };
    const replies = getReplies({ threadId });
    res.status(200).send({ data: replies });
  }
);

export default router;
