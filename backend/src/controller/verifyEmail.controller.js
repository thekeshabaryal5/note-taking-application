import expressAsyncHandler from "express-async-handler";
import { verifyToken } from "../utils/token.js";
import { jwtSecretKey } from "../constant.js";
import { pool } from "../connectToDatabase/DbConnection.js";

const verifyEmail = expressAsyncHandler(async (req, res, next) => {
  let tokenString = req.headers.authorization;
  let token = tokenString.split(" ")[1];
  let infoObj = await verifyToken(token, jwtSecretKey);
  let userId = infoObj.id;

  //making the user with respective id as verified
  let [result] = await pool.query(
    "UPDATE users SET isVerifiedEmail = TRUE WHERE id = ?",
    [userId]
  );
  res.status(200).json({
    success: true,
    message: "User verified successfully",
  });
});
export default verifyEmail;
