const express = require('express');
const upload = require('../../app/middleware/file');

const AttachmentController = require('../../app/controller/AttachmentController');

const router = express.Router();

router.post('/create', upload.single('file'), AttachmentController.uploadFile);
router.get('/:id', AttachmentController.downloadFile);

module.exports = router;
