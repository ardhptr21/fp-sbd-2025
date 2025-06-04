import "dotenv/config";

export const env = {
  app: {
    port: process.env.APP_PORT || 3000,
    host: process.env.APP_HOST || "localhost",
    secret: process.env.APP_SECRET || "fpsbd2025secretkey",
  },
  db: {
    url: process.env.DB_URL || "mongodb://localhost:27017/fpsbd2025",
  },
};
