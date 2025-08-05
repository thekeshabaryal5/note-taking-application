import { Router } from "express";
import { registerController } from "../controller/auth.controller.js";

const authRouter = Router();
authRouter.route("/register").post(registerController)



export default authRouter;