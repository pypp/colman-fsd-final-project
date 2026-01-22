import { Router } from "express";
import { getAiSummary } from "../controllers/ai.controller";

const router = Router();

/**
 * Generate AI Summary based on user query
 */
router.post("/search", getAiSummary);

export default router;
