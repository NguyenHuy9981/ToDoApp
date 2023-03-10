const express = require('express');
const ToDoController = require('../../app/controller/ToDoController');

const router = express.Router();

router.get('/stats', ToDoController.stats);

router.get('/', ToDoController.index);
router.post('/create', ToDoController.create);
router.get('/:id', ToDoController.detail);
router.put('/:id', ToDoController.update);
router.delete('/:id', ToDoController.delete);

router.put('/addFile/:id', ToDoController.addFile);
router.put('/removeFile/:id', ToDoController.removeFile);

router.use('/comment', require('./comment'));
router.use('/file', require('./file'));

module.exports = router;
