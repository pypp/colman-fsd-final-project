import { Router } from "express";
import { PostModel } from "../models/Post";
import mongoose from "mongoose";

const router = Router();

/**
 * GET all posts
 */
router.get("/", async (_req, res) => {
  const posts = await PostModel.find();
  res.json(posts);
});

/**
 * GET post by id
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post id" });
  }

  const post = await PostModel.findById(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});

export default router;
