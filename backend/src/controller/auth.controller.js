import expressAsyncHandler from "express-async-handler";
import { pool } from "../connectToDatabase/DbConnection.js";
import bcrypt from "bcrypt";


export const registerController = expressAsyncHandler(async(req,res,next)=>{
    const {username,password,email,contact,profileImage} = req.body;
    if(!username || !email || !password)
    {
        let error = new Error("Username, email and password are required");
        throw error;
    }
    else
    {
        //checking if the user already exist by the username and email
        const [existingUserByUsername] = await pool.query("select * from users where username=?",[username]);
        const [existingUserByEmail] = await pool.query("select * from users where email=?",[email]);

        if(existingUserByUsername.length > 0)
        {
            throw new Error("Username already exist");
        }
        else if(existingUserByEmail.length > 0)
        {
            throw new Error("Email already exist");
        }
        else
        {
            // hashing password 
            const hashedPassword = await bcrypt.hash(password,10);

            //store to db
            const sql = "insert into users (username,email,contact,password,profile_image) values (?,?,?,?,?)";
            const [result] = await pool.query(sql,[username,email,contact||null,hashedPassword,profileImage]);
            res.status(201).json({
            success:true,
            message:"User registered successfully",
            result:result
        })
        }
   
    }
});