const express = require('express');
const UserController = require('../app/controller/UserController');

const router = express.Router();

router.get('/me', UserController.me);

router.post('/changePass', UserController.changePass);

router.get('/logout', UserController.logout);

module.exports = router;
