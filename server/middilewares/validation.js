const { check } = require("express-validator");

module.exports.signupValidation = [
  check("email").isEmail().withMessage("Please enter a valid email address."),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters or longer."),
];

module.exports.emailValidation = [
  check("email").isEmail().withMessage("Invalid email address."),
];

module.exports.passwordResetValidation = [
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters or longer."),
];
