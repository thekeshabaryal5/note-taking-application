import expressAsyncHandler from "express-async-handler";
import { pool } from "../connectToDatabase/DbConnection.js";

const updateProfileImageController = expressAsyncHandler(async(req,res,next)=>{
    const userId = req.user.id;
    const profile_image = req.body.profile_image;
    const [result] = await pool.query("update users set profile_image=? where id=?",[profile_image,userId]);

    if(result.affectedRows === 0)
    {
        let error = new Error("User not found");
        error.status = 404;
        throw error;
    }
    else
    {
        res.status(201).json({
            success:true,
            message:"Profile image updated successfully",
            result:result
        })
    }
});


export default updateProfileImageController;