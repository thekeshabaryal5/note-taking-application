import { Router } from "express";

import userValidation from "../middleware/user.validation.js";
import { userValidationRule } from "../utils/validationRule.js";
import uploadProfilePicture from "../middleware/profileImage.middleware.js";
import loginController from "../controller/login.controller.js";
import authenticate from "../middleware/authentication.js";
import getCurrentUserController from "../controller/currentUser.controller.js";
import updateProfileImageController from "../controller/updateProfile.controller.js";
import registerController from "../controller/register.controller.js";
import verifyEmail from "../controller/verifyEmail.controller.js";
import logoutController from "../controller/logout.controller.js";

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
