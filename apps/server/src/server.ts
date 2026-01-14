import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const isDev = process.env.NODE_ENV !== "production";

const PORT = Number(process.env.SERVER_PORT) || 3000;
const HOST = isDev ? "localhost" : "0.0.0.0";

const start = async () => {
  await connectDB();

  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  });
};

start();
