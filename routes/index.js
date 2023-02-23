const express = require('express');

const router = express.Router();

const ToDoController = require('../app/Controller/ToDoController');
const UserController = require('../app/Controller/UserController');
const auth = require('../app/auth/checkToken');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('layout', { title: 'HelloWorld' });
// });

router.get('/', ToDoController.index);

router.post('/create', ToDoController.create);

router.put('/:id', ToDoController.update);
//

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.get('/me', auth, UserController.me);

console.log('SUA');

module.exports = router;
