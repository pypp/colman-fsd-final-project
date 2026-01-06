import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes";
import postsRoutes from "./routes/posts.routes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

export default app;
