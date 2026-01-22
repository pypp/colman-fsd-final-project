import { Router } from "express";
import { getAiSummary } from "../controllers/ai.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * Generate AI Summary based on user query
 */
router.post("/search", authMiddleware, getAiSummary);

export default router;
