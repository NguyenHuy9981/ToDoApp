const Job = require('../models/Job');

class ToDoController {
  index(req, res) {
    Job.find({ author: req.user.id })
      .then((job) => res.status(200).json(job))
      .catch(res.status(500));
  }

  async create(req, res) {
    const job = new Job({
      name: req.body.name,
      author: req.user._id,
    });
  }

  async update(req, res) {
    try {
      await Job.updateOne({ _id: req.params.id }, req.body);

      return res.status(200).json({
        success: true,
        message: req.i18n_texts.UPDATE_SUCCESS,
      });
    } catch (error) {
      return res.status(500).json({
        success: true,
        message: req.i18n_texts.ERROR,
        error,
      });
    }
  }

  async delete(req, res) {
    try {
      await Job.deleteOne({ _id: req.body._id });

      return res.status(200).json({
        success: true,
        message: req.i18n_texts.DELETE_SUCCESS,
      });
    } catch (error) {
      return res.status(500).json({
        success: true,
        message: req.i18n_texts.ERROR,
        error,
      });
    }
  }
}

module.exports = new ToDoController();
