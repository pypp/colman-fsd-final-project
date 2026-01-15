import mongoose, { Schema, Document } from "mongoose";
import { UserProfile } from "@repo/types";

/**
 * Database shape:
 * We take the public UserProfile, remove the 'id' (because Mongo uses _id),
 * and add the private fields needed for authentication.
 */
export type UserDB = Omit<UserProfile, "id"> & {
  password: string;
  tokens: string[];
};

/**
 * Mongoose document type
 */
export type UserDocument = UserDB & Document;

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    avatarUrl: { type: String, required: false, default: "" },
    bio: { type: String, required: false, default: "" },
    tokens: { type: [String], default: [] },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        const result = ret as any;
        delete result.password;
        delete result.tokens;
        delete result.__v;
        result.id = result._id.toString();
        delete result._id;
        return result;
      },
    },
  },
);

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
