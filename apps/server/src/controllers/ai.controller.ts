import { Request, Response } from "express";
import { generateSmartContent } from "../services/ai.service";

export const getAiSummary = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "A valid 'query' string is required" });
    }

    const result = await generateSmartContent(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing AI request" });
  }
};
