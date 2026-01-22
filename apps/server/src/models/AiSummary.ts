import mongoose, { Schema, Document } from "mongoose";
import { AiSummary } from "@repo/types";

export type AiSummaryDB = Omit<AiSummary, "id">;

export type AiSummaryDocument = AiSummaryDB & Document;

const AiSummarySchema = new Schema<AiSummaryDocument>(
  {
    prompt: { type: String, required: true, unique: true, index: true },
    response: {
      title: { type: String, required: true },
      summary: { type: String, required: true },
      keyPoints: [{ type: String, required: true }],
    },
    createdAt: { type: Date, default: Date.now, expires: 604800 },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        const result = ret as any;
        result.id = result._id.toString();
        delete result._id;
        delete result.__v;
        return result;
      },
    },
  },
);

export default mongoose.model<AiSummaryDocument>("AiSummary", AiSummarySchema);
