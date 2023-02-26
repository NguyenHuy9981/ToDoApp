const express = require('express');
const upload = require('../app/middleware/file');
const ToDoController = require('../app/controller/ToDoController');
const AttachmentController = require('../app/controller/AttachmentController');
const CommentController = require('../app/controller/CommentController');

const router = express.Router();

router.post('/uploadFile', upload.single('myFile'), AttachmentController.uploadFile);
router.get('/getFile/:id', AttachmentController.downloadFile);

router.get('/', ToDoController.index);
router.get('/stats', ToDoController.stats);
router.post('/create', ToDoController.create);
router.put('/:id', ToDoController.update);
router.post('/:id', ToDoController.update);

router.get('/comment', CommentController.detail);

router.post('/comment/create', CommentController.create);

router.put('/comment/:id', CommentController.update);

router.delete('/comment/:id', CommentController.delete);

module.exports = router;
