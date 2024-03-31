const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController')

// Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

// USER CONTROLLER //

router.get('/sign-up', user_controller.sign_up_get);

router.post('/sign-up', user_controller.sign_up_post);

module.exports = router;
