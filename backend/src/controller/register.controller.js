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

const registerController = expressAsyncHandler(async (req, res, next) => {
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

    //send email with link
    //generate tokon
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
});

export default registerController;
