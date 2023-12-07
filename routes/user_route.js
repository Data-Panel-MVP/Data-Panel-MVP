const userController = require('../controllers/user_control');

const express = require('express');
const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/user-profile', userController.userProfile);

module.exports= router;