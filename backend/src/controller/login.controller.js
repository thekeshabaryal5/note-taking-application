import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import { pool } from "../connectToDatabase/DbConnection.js";
import {
  cookieExpiryDuration,
  jwtExpiryDuration,
  jwtSecretKey,
} from "../constant.js";
import { generateToken } from "../utils/token.js";
const loginController = expressAsyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const [users] = await pool.query(
    "select * from users where username=? or email=?",
    [username, username]
  );

  //Check if the user is available or not
  if (users.length === 0) {
    const error = new Error("Invalid user credentials");
    error.status = 401;
    throw error;
  }
  const user = users[0];

  //check if the email is verified or not
  if (!user.isVerifiedEmail) {
    const error = new Error(
      "Verify your email via link provided in your email address"
    );
    error.status = 401;
    throw error;
  }
  //verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid user credentials");
    error.status = 401;
    throw error;
  } else {
    //Generate Token
    const info = {
      id: user.id,
    };
    const secretKey = jwtSecretKey;
    const expiryInfo = {
      expiresIn: jwtExpiryDuration,
    };
    const token = await generateToken(info, secretKey, expiryInfo);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(
        Date.now() + cookieExpiryDuration * 24 * 60 * 60 * 1000
      ),
    });
    res.status(200).json({
      success: true,
      message: "Login success",
      result: user,
    });
  }
});

export default loginController;
