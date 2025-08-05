import expressAsyncHandler from "express-async-handler";
import { pool } from "../connectToDatabase/DbConnection.js";
import bcrypt from "bcrypt";


export const registerController = expressAsyncHandler(async(req,res,next)=>{
    const {username,password,email,contact} = req.body;
    const profileImage = null
    if(!username || !email || !password)
    {
        let error = new Error("Username, email and password are required");
        throw error;
    }
    else
    {
        //checking if the user already exist by the username or email
        const [existingUser] = await pool.query("select * from users where username=? or email=?",[username,email]);

        if(existingUser.length > 0)
        {
            throw new Error("Username or email already exist");
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