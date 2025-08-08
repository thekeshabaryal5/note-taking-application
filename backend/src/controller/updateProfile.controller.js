import expressAsyncHandler from "express-async-handler";
import { pool } from "../connectToDatabase/DbConnection.js";
import { deleteUploadedFile } from "../utils/deleteUploadedFile.js";

const updateProfileImageController = expressAsyncHandler(
  async (req, res, next) => {
    const userId = req.user.id;
    const profile_image = req.body.profile_image;

    //deleting previous image
    const [oldImage] = await pool.query(
      "select profile_image from users where id=?",
      [userId]
    );
    // console.log(oldImage[0].profile_image);
    deleteUploadedFile(oldImage[0].profile_image);
    const [result] = await pool.query(
      "update users set profile_image=? where id=?",
      [profile_image, userId]
    );

    if (result.affectedRows === 0) {
      let error = new Error("User not found");
      error.status = 404;
      throw error;
    } else {
      res.status(201).json({
        success: true,
        message: "Profile image updated",
        result: result,
      });
    }
  }
);

export default updateProfileImageController;
