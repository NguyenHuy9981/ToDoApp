const express = require('express');
const MiddlewareAuth = require('../app/middleware/auth');
const MiddlewareSessionAuth = require('../app/middleware/sessionAuth');

const router = express.Router();

router.use('/auth', require('./auth'));
// Middleware
router.use(MiddlewareAuth.verifyToken);
router.use(MiddlewareSessionAuth.sessionAuth);

router.use('/todo', require('./todo'));
router.use('/user', require('./user'));

module.exports = router;
