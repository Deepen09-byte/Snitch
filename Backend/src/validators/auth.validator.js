import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

export const validateRegister = [
  body("email").isEmail().withMessage("Please provide a valid email address."),
  body("contact")
    .notEmpty()
    .withMessage("Contact number is required.")
    .isMobilePhone(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("fullName").notEmpty().withMessage("Full name is required."),

    validateRequest
];
