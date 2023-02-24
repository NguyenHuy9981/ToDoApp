const express = require('express');
const upload = require('../app/middleware/file');

const router = express.Router();

const ToDoController = require('../app/controller/ToDoController');
const AttachmentController = require('../app/controller/AttachmentController');

router.post('/uploadFile', upload.single('myFile'), AttachmentController.uploadFile);

router.get('/', ToDoController.index);
router.post('/create', ToDoController.create);
router.put('/:id', ToDoController.update);
router.post('/:id', ToDoController.update);

module.exports = router;
