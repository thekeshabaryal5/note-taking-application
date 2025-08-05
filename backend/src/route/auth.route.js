import { Router } from "express";


import { registerController } from "../controller/auth.controller.js";
import userValidation from "../middleware/user.validation.js";
import userValidationRule from "../validation/validationRule.js";


const authRouter = Router();
//checking if the user details are valid or not before registration
authRouter.route("/register").post(userValidation(userValidationRule),registerController)


export default authRouter;