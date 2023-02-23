const Job = require('../models/Job');

class ToDoController {
  async index(req, res) {
    try {
      const job = await Job.find({ authorRef: req.user._id });

      return res.json({
        success: true,
        data: job,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: req.i18n_texts.ERROR,
      });
    }
  }

  async create(req, res) {
    try {
      const job = new Job({
        name: req.body.name,
        description: req.body.description,
        authorRef: req.user._id,
      });

      await job.save({});

      return res.json({
        success: true,
        data: job,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: req.i18n_texts.ERROR,
      });
    }
  }

  async update(req, res) {
    try {
      await Job.updateOne({ _id: req.params.id }, req.body);

      return res.status(200).json({
        success: true,
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
