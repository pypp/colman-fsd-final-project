import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Denied: No Token Provided");
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET!;
    const decoded = jwt.verify(token, secret) as { id: string };

    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).send("Invalid or Expired Token");
  }
};
