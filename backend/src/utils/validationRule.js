import Joi from "joi";

// defining rules to validate user details using joi
export const userValidationRule = Joi.object({
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

export const noteValidationRule = Joi.object({
  // define rule for title
    title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Title must be a text value.",
      "string.max": "Tittle must not exceed 100 characters.",
      "string.min":"Title must be at least 3 characters long",
      "any.required": "Title is required."
    }),

    // define rule for note
    note: Joi.string().min(3).required().messages({
      "string.min":"Note must be at least 3 characters long",
      "any.required": "Note is required."
    })
}).unknown(true);

export const noteUpdateValidationRule = Joi.object({
  // title is optional but must follow rules if provided
  title: Joi.string()
    .min(3)
    .max(100)
    .optional()
    .messages({
      "string.base": "Title must be a text value.",
      "string.max": "Title must not exceed 100 characters.",
      "string.min": "Title must be at least 3 characters long"
    }),

  // note is optional but must follow rules if provided
  note: Joi.string()
    .min(3)
    .optional()
    .messages({
      "string.min": "Note must be at least 3 characters long"
    })
})
  // require at least one field
  .or("title", "note")
  .unknown(false);
