import { GoogleGenerativeAI } from "@google/generative-ai";
import AiSummary, { AiSummaryDocument } from "../models/AiSummary";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateSmartContent = async (userQuery: string): Promise<AiSummaryDocument["response"]> => {
  const cleanQuery = userQuery.toLowerCase().trim();

  const existingSummary = await AiSummary.findOne({ prompt: cleanQuery });
  if (existingSummary) {
    console.log("Serving from MongoDB Cache");
    return existingSummary.response;
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const systemPrompt = `
    You are a knowledge assistant for a social app. 
    User Query: "${userQuery}"
    Goal: Return a structured JSON summary. Do not use Markdown formatting.
    Format:
    {
      "title": "A short, catchy title",
      "summary": "A concise 2-sentence explanation",
      "keyPoints": ["Bullet point 1", "Bullet point 2", "Bullet point 3"]
    }
  `;

  try {
    const result = await model.generateContent(systemPrompt);
    const response = result.response;
    const text = response.text();

    const jsonString = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(jsonString);

    await AiSummary.create({
      prompt: cleanQuery,
      response: data,
    });

    return data;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Failed to generate content");
  }
};
