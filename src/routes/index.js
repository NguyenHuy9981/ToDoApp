const express = require('express');

const router = express.Router();

const UserController = require('../app/controller/UserController');
const MiddlewareAuth = require('../app/middleware/auth');
const MiddlewareSessionAuth = require('../app/middleware/sessionAuth');

router.use('/test', require('./test'));

router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Middleware
router.use(MiddlewareAuth.verifyToken);
router.use(MiddlewareSessionAuth.sessionAuth);

router.get('/me', UserController.me);
router.use('/todo', require('./todo'));
router.use('/users', require('./users'));

module.exports = router;
