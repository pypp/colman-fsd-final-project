import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";

export const registerUser = async (userData: {
  email: string;
  password: string;
  username: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
}) => {
  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) throw new Error("User already registered");

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(userData.password, salt);

  const newUser = new UserModel({
    ...userData,
    password: encryptedPassword,
  });

  await newUser.save();
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  if (!email || !password) throw new Error("bad email or password");

  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("bad email or password");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("bad email or password");

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
  const expiresIn = Number(process.env.JWT_TOKEN_EXPIRATION);
  const accessToken = jwt.sign({ id: user.id }, accessTokenSecret, {
    expiresIn,
  });

  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
  const refreshToken = jwt.sign({ id: user.id }, refreshTokenSecret);

  if (!user.tokens) {
    user.tokens = [refreshToken];
  } else {
    user.tokens.push(refreshToken);
  }
  await user.save();

  return { accessToken, refreshToken };
};
