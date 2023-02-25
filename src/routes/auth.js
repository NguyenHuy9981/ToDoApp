const express = require('express');
const UserController = require('../app/controller/UserController');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.post('/forgotPassRequest', UserController.forgotPassRequest);

router.post('/checkTokenForgot', UserController.checkTokenForgot);

router.post('/forgotPassVerify', UserController.forgotPassVerify);

module.exports = router;
