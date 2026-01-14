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
    const { accessToken, refreshToken } = await authService.loginUser(email, password);
    
    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};