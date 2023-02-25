const express = require('express');
const upload = require('../app/middleware/file');
const ToDoController = require('../app/controller/ToDoController');
const AttachmentController = require('../app/controller/AttachmentController');

const router = express.Router();

router.post('/uploadFile', upload.single('myFile'), AttachmentController.uploadFile);
router.get('/getFile/:id', AttachmentController.downloadFile);

router.get('/', ToDoController.index);
router.post('/create', ToDoController.create);
router.put('/:id', ToDoController.update);
router.post('/:id', ToDoController.update);

module.exports = router;
