const express = require('express');

const router = express.Router();

const UserController = require('../app/controller/UserController');
// router.get('/', (req, res) => {
//   res.send('respond with a resource');
// });

router.post('/sendMail', UserController.forgotPass);

module.exports = router;
