var express = require('express');
var router = express.Router();

const userController = require('../controllers/UserController')

const auth = require('../models/auth')

/* GET users listing. */
/* For testing only. */
router.get('/', userController.getAll);

/* Add new user. */
// router.get('/add', userController._add);

/* POST /register to add new user */
router.post('/register', auth.optional, userController.add)

/* Login route */
router.post('/login', auth.optional, userController.login)

/* Profile page */
router.get('/profile', auth.required, userController.profile)

/* Logout route */
router.get('/logout', auth.required, userController.logout)

module.exports = router;
