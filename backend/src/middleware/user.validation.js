import { deleteUploadedFile } from '../utils/deleteUploadedFile.js';
const userValidation = (userValidationRule)=>{
    return (req,res,next)=>{
    let data = userValidationRule.validate(req.body);
    let error = data.error;
    if(error)
    {
    //  If a file was uploaded, delete it
        if (req.file) {
            deleteUploadedFile(req.file.filename);
        }

        throw new Error(error.message);
    }
    else
    {
        next();
    }
}
};

export default userValidation;