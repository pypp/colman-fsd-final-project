import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const newUser = await authService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  try {
    const { accessToken, refreshToken, user } = await authService.loginUser(
      email,
      password,
    );

    res.status(200).json({
      accessToken,
      refreshToken,
      user,
    });
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).send("Google credential is required");
  }

  try {
    const { accessToken, refreshToken, user } =
      await authService.googleSignin(credential);

    res.status(200).json({
      accessToken,
      refreshToken,
      user,
    });
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const logout = async (req: Request, res: Response) => {
  const { email, refreshToken } = req.body;

  if (!email || !refreshToken) {
    return res.status(400).send("Email and refresh token are required");
  }

  try {
    await authService.logoutUser(email, refreshToken);
    res.status(200).send("Logged out successfully");
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};
