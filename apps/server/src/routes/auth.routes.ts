import { Router } from "express";
import { googleAuth, login, logout, register } from "../controllers/auth.controller";

const router = Router();

/**
 * Register a new user
 */
router.post("/register", register);

/**
 * Login a user
 */
router.post("/login", login);

/**
 * Google Authentication
 */
router.post("/google", googleAuth);

/** 
 * Logout a user
 */
router.post("/logout", logout);

export default router;
