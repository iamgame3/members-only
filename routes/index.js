const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/sign-up', user_controller.sign_up_get);

module.exports = router;
