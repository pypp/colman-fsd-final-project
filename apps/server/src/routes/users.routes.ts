import { Router } from "express";
import { UserModel } from "../models/User";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * GET all users
 */
router.get("/", authMiddleware, async (_req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

/**
 * GET user by username
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
