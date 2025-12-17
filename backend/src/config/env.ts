import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const isProduction = process.env.NODE_ENV === "production";

export const env = {
  PORT: getEnv("PORT", "5000"),
  MONGO_URI: getEnv("MONGO_URI"),
  ACCESS_TOKEN_SECRET: getEnv("ACCESS_TOKEN_SECRET", "supersecretkey"),
  REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET", "superrefreshsecret"),
  ACCESS_TOKEN_EXPIRES_IN: getEnv("ACCESS_TOKEN_EXPIRES_IN", "15m"),
  REFRESH_TOKEN_EXPIRES_IN: getEnv("REFRESH_TOKEN_EXPIRES_IN", "7d"),

  OMDB_API_KEY: getEnv("OMDB_API_KEY", isProduction ? undefined : ""),
  FRONTEND_URL: getEnv("FRONTEND_URL", "http://localhost:5173"),

  REDIS_USERNAME: getEnv("REDIS_USERNAME", ""),
  REDIS_PASSWORD: getEnv("REDIS_PASSWORD", ""),
  REDIS_HOST: getEnv("REDIS_HOST", "localhost"),
  REDIS_PORT: getEnv("REDIS_PORT", "6379"),

  SMTP_HOST: getEnv("SMTP_HOST", "smtp.gmail.com"),
  SMTP_PORT: getEnv("SMTP_PORT", "587"),
  SMTP_USER: getEnv("SMTP_USER", "test@gmail.com"),
  SMTP_PASS: getEnv("SMTP_PASS", ""),
  SMTP_FROM: getEnv("SMTP_FROM", "noreply@movieapi.com"),

  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};
