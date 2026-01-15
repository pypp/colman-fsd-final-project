import { UserProfile, UserWithAuthTokens } from '@repo/types';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDocument, UserModel } from "../models/User";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUser = async (userData: {
  email: string;
  password: string;
  username: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
}): Promise<UserDocument> => {
  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) throw new Error("User already registered");

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(userData.password, salt);

  const newUser = new UserModel({
    ...userData,
    password: encryptedPassword,
  });

  const savedUser = await newUser.save();
  return savedUser;
};

export const loginUser = async (email: string, password: string): Promise<UserWithAuthTokens> => {
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
  const savedUser = await user.save();

  return { accessToken, refreshToken, user: savedUser };
};

export const googleSignin = async (credential: string) => {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload || !payload.email) throw new Error("Invalid Google token");

  const { email, name, picture } = payload;

  let user = await UserModel.findOne({ email });

  if (!user) {
    user = new UserModel({
      email,
      name,
      avatarUrl: picture,
      username: email.split("@")[0],
      password: "external_auth_no_password", // Placeholder
    });
    await user.save();
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
  const expiresIn = Number(process.env.JWT_TOKEN_EXPIRATION);
  const accessToken = jwt.sign({ id: user.id }, accessTokenSecret, {
    expiresIn,
  });

  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
  const refreshToken = jwt.sign({ id: user.id }, refreshTokenSecret);

  user.tokens = user.tokens ? [...user.tokens, refreshToken] : [refreshToken];
  await user.save();

  return { accessToken, refreshToken, user };
};

export const logoutUser = async (email: string, refreshToken: string): Promise<{ message: string }> => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");

  user.tokens = user.tokens ? user.tokens.filter((t) => t !== refreshToken) : [];
  
  await user.save();
  return { message: "Logged out successfully" };
};
