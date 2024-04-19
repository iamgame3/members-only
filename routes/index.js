const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const passport = require("passport");
const session = require("express-session");

router.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
router.use(passport.session());
router.use(express.urlencoded({ extended: false }));

// Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', user: req.user });
});

// USER CONTROLLER //

router.get('/sign-up', user_controller.sign_up_get);

router.post('/sign-up', user_controller.sign_up_post);

router.get('/log-in', user_controller.log_in_get);

router.get('/membership', user_controller.member_get);

router.post('/membership', user_controller.member_post);

router.get('/admin', user_controller.admin_get);

router.post('/admin', user_controller.admin_post);

// OTHER //

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in"
  })
);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
