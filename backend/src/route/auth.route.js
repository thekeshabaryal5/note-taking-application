import { Router } from "express";


import { registerController } from "../controller/register.controller.js";
import userValidation from "../middleware/user.validation.js";
import userValidationRule from "../utils/validationRule.js";
import uploadProfilePicture from "../middleware/profile.middleware.js";
import { loginController } from "../controller/login.controller.js";
import authenticate from "../middleware/authentication.js";
import getCurrentUserController from "../controller/currentUser.controller.js";


const authRouter = Router();
//checking if the user details are valid or not before registration
authRouter.route("/register").post(uploadProfilePicture,userValidation(userValidationRule),registerController)

// login router
authRouter.route("/login").post(loginController);

authRouter.get("/me",authenticate,getCurrentUserController);

export default authRouter;