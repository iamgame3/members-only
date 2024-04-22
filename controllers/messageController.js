const Message = require('../models/message');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display New Post form on GET.
exports.new_post_get = (req, res, next) => {
    res.render("new_post", { title: "Create New Post", user: req.user });
};
