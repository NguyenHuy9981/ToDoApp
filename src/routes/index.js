const express = require('express');

const router = express.Router();

const UserController = require('../app/controller/UserController');
const MiddlewareAuth = require('../app/middleware/auth');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(MiddlewareAuth.verifyToken);

router.get('/me', UserController.me);
router.use('/todo', require('./todo'));
router.use('/users', require('./users'));

module.exports = router;
