import mongoose, { Schema, Document } from "mongoose";
import { Post } from "@repo/types";

/**
 * Database shape
 */
export type PostDB = Omit<Post, "id">;

/**
 * Mongoose document type
 */
export type PostDocument = PostDB & Document;

const PostSchema = new Schema<PostDocument>({
  caption: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const PostModel = mongoose.model<PostDocument>("Post", PostSchema);
