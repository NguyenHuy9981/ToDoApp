const express = require('express');
const CommentController = require('../../app/controller/CommentController');

const router = express.Router();

router.get('/:todoId', CommentController.detail);

router.post('/create', CommentController.create);

router.put('/:id', CommentController.update);

router.delete('/:id', CommentController.delete);

module.exports = router;
