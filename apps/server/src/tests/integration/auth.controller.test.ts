import request from "supertest";
import app from "../../app";
import { UserModel } from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("Auth Controller Integration Tests (Using Spies)", () => {
  afterEach(() => {
    jest.restoreAllMocks();
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
      jest.spyOn(UserModel, "findOne").mockResolvedValue(null);
      jest.spyOn(UserModel.prototype, "save").mockResolvedValue({
        ...validUser,
        toJSON: () => ({ email: validUser.email, username: validUser.username }),
      });

      const res = await request(app).post("/api/auth/register").send(validUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("email", validUser.email);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login successfully and return tokens", async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);

      const mockUser = {
        id: "mock-id",
        email: "login@test.com",
        password: hashedPassword,
        tokens: [],
        save: jest.fn().mockResolvedValue(true),
      };

      jest.spyOn(UserModel, "findOne").mockResolvedValue(mockUser);

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
      const mockRefreshToken = "mock-refresh-token";
      const mockUser = {
        email: "logout@test.com",
        tokens: [mockRefreshToken],
        save: jest.fn().mockResolvedValue(true),
      };

      jest.spyOn(UserModel, "findOne").mockResolvedValue(mockUser);

      const res = await request(app)
        .post("/api/auth/logout")
        .send({ email: "logout@test.com", refreshToken: mockRefreshToken });

      expect(res.status).toBe(200);
      expect(res.text).toBe("Logged out successfully");
      expect(mockUser.tokens).not.toContain(mockRefreshToken);
    });
  });
});
