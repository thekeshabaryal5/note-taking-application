// code to connect to database
import mysql from "mysql2/promise"
import { db_database, db_host, db_password, db_user } from "../constant.js";

let pool = null
const connectToDatabase = async()=>{
    try
    {
    pool = mysql.createPool({
    host:db_host,
    user:db_user,
    password:db_password,
    database:db_database
});
const connection = await pool.getConnection();
console.log("Connected to database successfully");
connection.release();
}
catch(err)
{
    console.log("Database connection failed: ",err.message);
    process.exit(1);
}
}

export {pool,connectToDatabase}