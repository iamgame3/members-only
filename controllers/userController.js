const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display Sign Up form on GET.
exports.sign_up_get = (req, res, next) => {
    res.render("sign_up", { title: "Sign Up" });
};
