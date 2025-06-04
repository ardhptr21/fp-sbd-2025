import { env } from "./env.js";
import mongoose from "mongoose";

export function connectDB(callback) {
  mongoose
    .connect(env.db.url, {})
    .then(() => {
      console.log("Database connected successfully");
      if (callback) callback();
    })
    .catch((err) => {
      console.error("Database connection error:", err);
      process.exit(1);
    });
}
