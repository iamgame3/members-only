const Message = require('../models/message');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display New Post form on GET.
exports.new_post_get = (req, res, next) => {
    res.render("new_post", { title: "Create New Post", user: req.user });
};

// Handle New Post form on POST.
exports.new_post_post = [
    // Validate and sanitize fields
    body("messageTitle", "Title must contain at least 1 character and at most 200 characters.")
      .trim()
      .isLength({ min: 1 })
      .isLength({ max: 200 })
      .escape(),
    body("body", "Body must contain at least 1 character and at most 1000 characters.")
      .trim()
      .isLength({ min: 1 })
      .isLength({ max: 1000 })
      .escape(),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

        // Create a message object with escaped and trimmed data.
        const message = new Message({
            messageTitle: req.body.messageTitle,
            time_stamp: Date.now(),
            body: req.body.body,
            author: req.user,
        });
    
        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render("new_post", {
            title: "Create New Post",
            user: req.user,
            messageTitle: req.body.messageTitle,
            time_stamp: Date.now(),
            body: req.body.body,
            author: req.user,
            errors: errors.array(),
            });
            return;
        } else {
            // Data from form is valid.
            await message.save();
            // New message saved. Redirect to home page.
            res.redirect('/');
        }
    }),
  ];