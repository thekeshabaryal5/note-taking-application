import expressAsyncHandler from "express-async-handler";
import { pool } from "../connectToDatabase/DbConnection.js";
import bcrypt from "bcrypt";
import { deleteUploadedFile } from "../utils/deleteUploadedFile.js";
import {
  frontendUrl,
  jwtEmailVerificationExpires,
  jwtSecretKey,
} from "../constant.js";
import { generateToken } from "../utils/token.js";
import { sendEmail } from "../utils/sendMail.js";

// register user controller
export const registerController = expressAsyncHandler(
  async (req, res, next) => {
    const { username, password, email, contact, profile_image } = req.body;

    //checking if the user already exist by the username and email
    const [existingUserByUsername] = await pool.query(
      "select * from users where username=?",
      [username]
    );
    const [existingUserByEmail] = await pool.query(
      "select * from users where email=?",
      [email]
    );

    if (existingUserByUsername.length > 0) {
      // deleting the uploaded files
      if (req.file) {
        deleteUploadedFile(req.file.filename);
      }
      throw new Error("Username already exist");
    } else if (existingUserByEmail.length > 0) {
      // deleting uploaded file
      if (req.file) {
        deleteUploadedFile(req.file.filename);
      }
      throw new Error("Email already exist");
    } else {
      // hashing password
      const hashedPassword = await bcrypt.hash(password, 10);

      //store to db
      const sql =
        "insert into users (username,email,contact,password,profile_image) values (?,?,?,?,?)";
      const [result] = await pool.query(sql, [
        username,
        email,
        contact || null,
        hashedPassword,
        profile_image,
      ]);

      //send email with link attaching a token
      let info = {
        id: result.insertId,
      };
      let expiryInfo = {
        expiresIn: jwtEmailVerificationExpires,
      };

      let token = await generateToken(info, jwtSecretKey, expiryInfo);

      await sendEmail({
        from: "'Note-Taking-App'<keshabaryal152@gmail.com>",
        to: email,
        subject: "Welcome to Note-taking application",
        html: `
    <p>Your account has been created successfully. Click on the following link to verify your email:</p>
    <p>
      <a href="${frontendUrl}/verify-email?token=${token}">${frontendUrl}/verify-email?token=${token}</a>
    </p>
  `,
      });
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        result: result,
      });
    }
  }
);

//reading specified user
export const getCurrentUserController = expressAsyncHandler(
  async (req, res, next) => {
    const userId = req.user.id;

    const [users] = await pool.query(
      "select id,username,email,contact,profile_image from users where id = ?",
      [userId]
    );
    if (users.length === 0) {
      let error = new Error("User not found");
      error.status = 404;
      throw error;
    } else {
      res.status(200).json({
        success: true,
        result: users[0],
        message: "user details",
      });
    }
  }
);

//update profile image controller
export const updateProfileImageController = expressAsyncHandler(
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
