const Comment = require('../models/Comment');

class CommentController {
  async detail(req, res) {
    try {
      const comment = await Comment.find({
        jobRef: req.params.todoId,
      });
      return res.json({
        success: true,
        data: comment,
      });
    } catch (error) {
      return res.status(500).json({
        message: req.i18n_texts.ERROR,
        error,
      });
    }
  }

  async create(req, res) {
    try {
      const comment = new Comment({
        content: req.body.content,
        jobRef: req.body.jobId,
        userRef: req.user.id,
      });

      await comment.save();
      return res.status(200).json({
        success: true,
        data: comment,
      });
    } catch (error) {
      return res.status(500).json({
        message: req.i18n_texts.ERROR,
      });
    }
  }

  async update(req, res) {
    try {
      await Comment.updateOne({ _id: req.params.id }, req.body);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: req.i18n_texts.ERROR,
      });
    }
  }

  async delete(req, res) {
    try {
      await Comment.deleteOne({ _id: req.params.id });

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: req.i18n_texts.ERROR,
      });
    }
  }
}

module.exports = new CommentController();
