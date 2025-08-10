import { Router } from "express";

import userValidation from "../middleware/user.validation.js";
import { userValidationRule } from "../utils/validationRule.js";
import uploadProfilePicture from "../middleware/profileImage.middleware.js";

import authenticate from "../middleware/authentication.js";
import { getCurrentUserController, registerController, updateProfileImageController } from "../controller/user.controller.js";
import { loginController, logoutController, verifyEmail } from "../controller/auth.controller.js";

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
