const User = require('../models/user');
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const asyncHandler = require("express-async-handler");

// Display Sign Up form on GET.
exports.sign_up_get = (req, res, next) => {
    res.render("sign_up", { title: "Sign Up", user: req.user });
};

// Handle Sign Up form on POST.
exports.sign_up_post = [
    // Validate and sanitize fields
    body("fname", "First name must contain at least 1 character and at most 20 characters.")
      .trim()
      .isLength({ min: 1 })
      .isLength({ max: 20 })
      .escape(),
    body("lname", "Last name must contain at least 1 character and at most 20 characters.")
      .trim()
      .isLength({ min: 1 })
      .isLength({ max: 20 })
      .escape(),
    body("uname", "Username must contain at least 1 character and at most 40 characters.")
      .trim()
      .isLength({ min: 1 })
      .isLength({ max: 40 })
      .escape()
      .custom(async value => {
        const user = await User.findOne({ username: value }).exec();
        if (user) {
          throw new Error('Username already in use.');
        }
      }),
    body("password", "Password must contain at least 10 characters.")
      .trim()
      .isLength({ min: 10 })
      .escape(),
    body("confirmPassword", "Passwords must match.")
      .trim()
      .escape()
      .custom((value, { req }) => {
        return value === req.body.password;
      }),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Hash password
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          if (err) {
            return next(err);
          }
          else {
            // Create a user object with escaped and trimmed data.
            const user = new User({
              first_name: req.body.fname,
              last_name: req.body.lname,
              username: req.body.uname,
              password: hashedPassword,
              is_member: false,
              is_admin: false,
            });
        
            if (!errors.isEmpty()) {
              // There are errors. Render the form again with sanitized values/error messages.
              res.render("sign_up", {
                title: "Sign Up",
                first_name: req.body.fname,
                last_name: req.body.lname,
                username: req.body.uname,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
                errors: errors.array(),
              });
              return;
            } else {
              // Data from form is valid.
              await user.save();
              // New user saved. Redirect to log in page.
              res.redirect('/log-in');
            }
          }
        });
  
    }),
  ];

exports.log_in_get = (req, res, next) => {
    res.render("log_in", { title: "Log In", user: req.user });
};
