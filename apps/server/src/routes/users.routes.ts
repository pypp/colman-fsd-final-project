import { Router } from "express";
import { UserModel } from "../models/User";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
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
 *                   username:
 *                     type: string
 *                     example: "johndoe"
 *                   email:
 *                     type: string
 *                     example: "john@example.com"
 */
router.get("/", authMiddleware, async (_req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

/**
 * @swagger
 * /api/users/{username}:
 *   get:
 *     summary: Get a user by username
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "6412abcd1234abcd1234abcd"
 *                 username:
 *                   type: string
 *                   example: "johndoe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *       404:
 *         description: User not found
 */
router.get("/:username", async (req, res) => {
  const { username } = req.params;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

export default router;
