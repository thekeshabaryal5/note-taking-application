import { config } from "dotenv";

config();
export const port = process.env.PORT || 3000
export const db_host = process.env.DB_HOST || "localhost"
export const db_user = process.env.DB_USER || "root"
export const db_password = process.env.DB_PASSWORD || ""
export const db_database = process.env.DB_DATABASE 
export const webUrl = process.env.WEB_URL