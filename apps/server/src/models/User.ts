import mongoose, { Schema, Document } from "mongoose";
import { UserProfile } from "@repo/types";

/**
 * Database shape
 * (Mongo uses _id, not id)
 */
export type UserDB = Omit<UserProfile, "id">;

/**
 * Mongoose document type
 */
export type UserDocument = UserDB & Document;

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, index: true },
  avatarUrl: { type: String, required: true },
  bio: { type: String, required: true },
});

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
