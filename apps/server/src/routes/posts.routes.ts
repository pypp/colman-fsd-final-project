import { Router } from "express";
import { PostModel } from "../models/Post";
import mongoose from "mongoose";

const router = Router();

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6412abcd1234abcd1234abcd"
 *                   title:
 *                     type: string
 *                     example: "My first post"
 *                   content:
 *                     type: string
 *                     example: "Hello world!"
 */
router.get("/", async (_req, res) => {
  const posts = await PostModel.find();
  res.json(posts);
});

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "6412abcd1234abcd1234abcd"
 *                 title:
 *                   type: string
 *                   example: "My first post"
 *                 content:
 *                   type: string
 *                   example: "Hello world!"
 *       400:
 *         description: Invalid post ID
 *       404:
 *         description: Post not found
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
