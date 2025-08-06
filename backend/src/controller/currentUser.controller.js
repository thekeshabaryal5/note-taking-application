import expressAsyncHandler from "express-async-handler"
import { pool } from "../connectToDatabase/DbConnection.js";
const getCurrentUserController = expressAsyncHandler(async (req,res,next)=>{
    const userId = req.user.id;
 
    const [users]= await pool.query("select id,username,email,contact,profile_image from users where id = ?",[userId]);
    if(users.length === 0)
    {
        let error = new Error("User not found");
        error.status = 404;
        throw error;
    }
    else
    {
        res.status(200).json({
            success:true,
            result:users[0],
            message:"user details"
        });
    }
});

export default getCurrentUserController;