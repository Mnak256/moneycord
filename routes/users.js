var express = require('express');
var router = express.Router();

const userController = require('../controllers/UserController')

/* GET users listing. */
router.get('/', userController.getAll);

module.exports = router;
