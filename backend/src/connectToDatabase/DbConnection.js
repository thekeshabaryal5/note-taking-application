import fs from "fs";
import mysql from "mysql2/promise";
import { db_database, db_host, db_password, db_user } from "../constant.js";

let pool = null;

const connectToDatabase = async () => {
  try {
    // Connect without specifying the database
    const connection = await mysql.createConnection({
      host: db_host,
      user: db_user,
      password: db_password,
      multipleStatements: true,
    });

    // Run schema.sql
    const schemaSql = fs.readFileSync("./src/models/schema.sql", "utf8");
    await connection.query(schemaSql);
    console.log("Database & tables verified/created.");

    // Run seed.sql only if category table is empty
    const [rows] = await connection.query(
      `SELECT COUNT(*) AS count FROM ${db_database}.category`
    );
    if (rows[0].count === 0) {
      const seedSql = fs.readFileSync("./src/models/seed.sql", "utf8");
      await connection.query(`USE ${db_database}; ${seedSql}`);
      console.log("Seed data inserted.");
    } else {
      console.log("Seed data already exists — skipping insert.");
    }

    // Create a pool for the app
    pool = mysql.createPool({
      host: db_host,
      user: db_user,
      password: db_password,
      database: db_database,
    });

    connection.end();
  } catch (err) {
    console.error("Database setup failed:", err.message);
    process.exit(1);
  }
};

export { pool, connectToDatabase };
