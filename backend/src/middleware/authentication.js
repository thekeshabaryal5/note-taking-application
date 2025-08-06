import expressAsyncHandler from "express-async-handler";
import { verifyToken } from "../utils/token.js";
import { jwtSecretKey } from "../constant.js";
const authenticate = expressAsyncHandler(async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token)
    {
        let error = new Error("Please login to access");
        error.status = 401;
        throw error;
    }
    try
    {
        const userInfo = await verifyToken(token,jwtSecretKey);
        req.user = userInfo;
        next();
    }
    catch(error)
    {
        error.message("Invalid token");
        error.status = 401;
        throw error;
    }
});

export default authenticate;