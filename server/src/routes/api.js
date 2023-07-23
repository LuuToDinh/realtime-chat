const express = require('express');
const router = express.Router();

const userController = require('../app/Controllers/UserController');

router.get('/find/:userId', userController.find);
router.get('/users', userController.users);

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);

module.exports = router;
