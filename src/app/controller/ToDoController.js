const Job = require('../models/Job');

class ToDoController {
  async index(req, res) {
    try {
      const filter = {
        authorRef: req.user._id,
      };

      if (req.query.search) {
        filter.$or = [
          { name: { $regex: req.query.search } },
          { description: { $regex: req.query.search } },
        ];
      }

      if (req.query.status) {
        filter.status = req.query.status;
      }

      if (req.query.timeBegin || req.query.timeEnd) {
        filter.createdAt = {};
      }

      if (req.query.timeBegin) {
        filter.createdAt.$gte = req.query.timeBegin;
      }

      if (req.query.timeEnd) {
        filter.createdAt.$lte = req.query.timeEnd;
      }

      const job = await Job.find(filter);

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
        file: req.myFile,
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

  uploadFile(req, res, next) {
    try {
      const myFile = req.file;

      if (!myFile) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
      }
      return res.send(myFile);
    } catch (error) {
      return res.send('Lỗi');
    }
  }

  uploadMultiFile(req, res, next) {
    const myFile = req.files;

    if (!myFile) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    return res.send(myFile);
  }
}

module.exports = new ToDoController();
