import { serverUrl} from "../constant.js";
import upload from "./uploadFile.js";

const uploadProfilePicture = (req,res,next)=>{
    {
        upload.single('profile_image')(req,res,(err)=>{
            if(err)
            {
                throw new Error(err.message);
            }
            if(req.file)
            {
                req.body.profile_image = `${serverUrl}/${req.file.filename}`;
            }
            else
            {
                req.body.profile_image=null;
            }
            next();
        })

    }
    
}



export default uploadProfilePicture;