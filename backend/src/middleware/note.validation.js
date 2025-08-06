const noteValidation = (noteValidationRule)=>{
    return (req,res,next)=>{
    let data = noteValidationRule.validate(req.body);
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

export default noteValidation;