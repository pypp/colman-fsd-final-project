import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const PORT = Number(process.env.SERVER_PORT) || 3000;
const HOST = "0.0.0.0";

const start = async () => {
  await connectDB();

  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  });
};

start();
