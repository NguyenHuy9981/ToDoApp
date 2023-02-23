const express = require('express');

const router = express.Router();

const ToDoController = require('../app/controller/ToDoController');

router.get('/', ToDoController.index);
router.post('/create', ToDoController.create);
router.put('/:id', ToDoController.update);

module.exports = router;
