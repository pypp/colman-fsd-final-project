import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";
import { UserModel } from "../../models/User";

describe("Auth Controller Integration Tests", () => {
  beforeAll(async () => {
    const url = process.env.MONGODB_URI!;
    await mongoose.connect(url);
  });

  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("POST /api/auth/register", () => {
    const validUser = {
      email: "test@example.com",
      password: "password123",
      username: "testuser",
      name: "Test User",
      avatarUrl: "http://example.com/avatar.png",
      bio: "This is a test user.",
    };

    it("should register a new user and return 201", async () => {
      const res = await request(app).post("/api/auth/register").send(validUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("email", validUser.email);
      expect(res.body).not.toHaveProperty("password");
    });

    it("should return 400 if email already exists", async () => {
      await request(app).post("/api/auth/register").send(validUser);

      const res = await request(app).post("/api/auth/register").send(validUser);
      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login successfully and return tokens", async () => {
      await request(app).post("/api/auth/register").send({
        email: "login@test.com",
        password: "password123",
        username: "loginuser",
        name: "Login User",
        avatarUrl: "http://example.com/avatar2.png",
        bio: "This is a login test user.",
      });

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "login@test.com", password: "password123" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("accessToken");
      expect(res.body).toHaveProperty("refreshToken");
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should remove the refresh token and return 200", async () => {
      const logoutUser = {
        email: "logout@test.com",
        password: "password123",
        username: "logoutuser",
        name: "Logout User",
        avatarUrl: "http://example.com/avatar3.png",
        bio: "Logout test user.",
      };

      await request(app).post("/api/auth/register").send(logoutUser);

      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: logoutUser.email, password: logoutUser.password });

      const { refreshToken } = loginRes.body;

      const res = await request(app)
        .post("/api/auth/logout")
        .send({ email: logoutUser.email, refreshToken });

      expect(res.status).toBe(200);
      expect(res.text).toBe("Logged out successfully");

      const user = await UserModel.findOne({ email: logoutUser.email });
      expect(user?.tokens).not.toContain(refreshToken);
    });
  });
});
