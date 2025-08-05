const userValidation = (userValidationRule)=>{
    return (req,res,next)=>{
    let data = userValidationRule.validate(req.body);
    let error = data.error;
    if(error)
    {
        throw new Error(error.message);
    }
    else
    {
        next();
    }
}
};

export default userValidation;