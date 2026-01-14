import { Types } from "mongoose";

export interface Post {
  userId: Types.ObjectId;
  caption: string;
  imageUrl?: string;
  createdAt: Date;
}
