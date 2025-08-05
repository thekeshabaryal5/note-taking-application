import Joi from "joi";

// defining rules to validate user details using joi
const userValidationRule = Joi.object({
    // username must be string unique and cann't be null with minimum 3 chars and max 255chars
  username: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
      "string.base": "Username must be a text value.",
      "string.max": "Username must not exceed 255 characters.",
      "string.min":"username must be at least 3 characters long",
      "any.required": "Username is required."
    }),

    //email must be a valid  email and cann't be null 
  email: Joi.string()
    .email()
    .max(255)
    .required()
    .messages({
      "string.base": "Email must be a text value.",
      "string.email": "Please provide a valid email address.",
      "string.max": "Email must not exceed 255 characters.",
      "any.required": "Email is required."
    }),

    //Defining rules for password
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.",
      "any.required": "Password is required."
    }),

    //contact can be null but if provided must be a valid 10 digit nepalese mobile number
  contact: Joi.string()
    .pattern(/^9[87]\d{8}$/)
    .allow(null)
    .messages({
      "string.pattern.base": "Contact must be a valid 10-digit Nepalese mobile number starting with 98 or 97."
    }),

    //profile image can be null but if provided should be a valid url
  profile_image: Joi.string()
    .uri()
    .allow(null)
    .messages({
      "string.uri": "Profile image must be a valid URL."
    })
}).unknown(false);


export default userValidationRule;