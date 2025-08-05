import expressAsyncHandler from "express-async-handler";
import { pool } from "../connectToDatabase/DbConnection.js";
import bcrypt from "bcrypt";
export const loginController =  expressAsyncHandler(async (req,res,next)=>{
    const {username, password} = req.body;
    const [users] = await pool.query("select * from users where username=? or email=?",[username,username]);
    if(users.length === 0)
    {
        const error = new Error("Invalid user credentials");
        error.status = 401;
        throw error;
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(password,user.password);
    if(! isMatch)
    {
        const error = new Error("Invalid user credentials");
        error.status = 401;
        throw error;
    }
    else
    {
        res.status(200).json({
            success:true,
            message:"Login success",
            result:user
        })
    }
})