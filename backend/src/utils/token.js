import jwt from "jsonwebtoken";
export let generateToken = async (info,secretKey,expiryInfo)=>{
    return  jwt.sign(info,secretKey,expiryInfo);
}

export let verifyToken = async (token,secretKey)=>{
    return jwt.verify(token,secretKey);
   
}
