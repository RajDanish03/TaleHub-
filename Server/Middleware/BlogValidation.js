const { body, validationResult } = require("express-validator");

// Array of middleware rules
exports.Blogvalidation = [
  body("title")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Title must be at least 10 characters long"),

  body("description")
    .trim()
    .isLength({ min: 15 })
    .withMessage("Description must be at least 15 characters long"),

  body("image")
    .notEmpty()
    .withMessage("Image is required")
];

// Middleware to check validation result
exports.validateBlog = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};
