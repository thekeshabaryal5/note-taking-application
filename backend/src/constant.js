import { config } from "dotenv";

config();
export const port = process.env.PORT || 3000;
export const db_host = process.env.DB_HOST || "localhost";
export const db_user = process.env.DB_USER || "root";
export const db_password = process.env.DB_PASSWORD || "";
export const db_database = process.env.DB_DATABASE;
export const serverUrl = process.env.SERVER_URL;
export const jwtSecretKey = process.env.JWT_SECRET_KEY;
export const jwtExpiryDuration = process.env.JWT_EXPIRES;
export const cookieExpiryDuration = process.env.COOKIE_EXPIRES;
export const jwtEmailVerificationExpires =
  process.env.JWT_EMAIL_VERIFICATION_EXPIRES;
export const emailHost = process.env.EMAIL_HOST;
export const emailAddress = process.env.EMAIL_ADDRESS;
export const emailPassword = process.env.EMAIL_PASSWORD;
export const frontendUrl = process.env.FRONTEND_URL;
