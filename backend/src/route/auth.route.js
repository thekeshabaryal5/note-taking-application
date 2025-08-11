import { Router } from "express";

import userValidation from "../middleware/user.validation.js";
import { userValidationRule } from "../utils/validationRule.js";
import uploadProfilePicture from "../middleware/profileImage.middleware.js";

import authenticate from "../middleware/authentication.js";
import {
  getCurrentUserController,
  registerController,
  updateProfileImageController,
} from "../controller/user.controller.js";
import {
  loginController,
  logoutController,
  verifyEmail,
} from "../controller/auth.controller.js";

// swagger docs
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & User Profile
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/user/verify-email:
 *   patch:
 *     summary: Verify user's email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile details
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/user/upload-profile-image:
 *   patch:
 *     summary: Upload or update profile picture
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile image updated successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Logout the current user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */

const authRouter = Router();
//checking if the user details are valid or not before registration
authRouter
  .route("/register")
  .post(
    uploadProfilePicture,
    userValidation(userValidationRule),
    registerController
  );
//verify email
authRouter.route("/verify-email").patch(verifyEmail);
// login router
authRouter.route("/login").post(loginController);
//profile router
authRouter.route("/me").get(authenticate, getCurrentUserController);
//update profile image router
authRouter
  .route("/upload-profile-image")
  .patch(authenticate, uploadProfilePicture, updateProfileImageController);

//logout router
authRouter.route("/logout").post(logoutController);
export default authRouter;
