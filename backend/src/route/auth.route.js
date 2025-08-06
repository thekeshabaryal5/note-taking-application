import { Router } from "express";


import userValidation from "../middleware/user.validation.js";
import {userValidationRule} from "../utils/validationRule.js";
import uploadProfilePicture from "../middleware/profileImage.middleware.js";
import loginController from "../controller/login.controller.js";
import authenticate from "../middleware/authentication.js";
import getCurrentUserController from "../controller/currentUser.controller.js";
import updateProfileImageController from "../controller/updateProfile.controller.js";
import registerController from "../controller/register.controller.js";


const authRouter = Router();
//checking if the user details are valid or not before registration
authRouter.route("/register").post(uploadProfilePicture,userValidation(userValidationRule),registerController)

// login router
authRouter.route("/login").post(loginController);

authRouter.get("/me",authenticate,getCurrentUserController);

authRouter.patch("/upload-profile-image",authenticate,uploadProfilePicture,updateProfileImageController);

export default authRouter;