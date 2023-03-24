const Job = require('../models/Job');

class ToDoController {
  async index(req, res) {
    try {
      // Filter
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

      // Pagging
      const page = (req.query._page) ? Math.max(0, Number(req.query._page)) : 1;
      const limit = (req.query._limit) ? Math.max(0, Number(req.query._limit)) : 100;

      const listJob = await Job.find(filter)
        .limit(limit)
        .skip(limit * (page - 1)).sort({
          createdAt: -1,
        });

      const total = await Job.countDocuments(filter);

      return res.json({
        success: true,
        data: listJob,
        total,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: req.i18n_texts.ERROR,
      });
    }
  }

  async stats(req, res) {
    const data = await Job.aggregate([
      {
        $match: {
          authorRef: req.user.objectId,
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    return res.json({
      success: true,
      data,
    });
  }

  async create(req, res) {
    try {
      const job = new Job({
        name: req.body.name,
        description: req.body.description,
        authorRef: req.user._id,
        fileRef: req.body.fileRef,
        processingDay: req.processingDay,
        doneDay: req.doneDay,
      });

      await job.save();

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

  async addFile(req, res) {
    try {
      const { fileRef } = req.body;

      const job = await Job.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { fileRef },
        },
      );

      return res.status(200).json({
        success: true,
        data: job,
      });
    } catch (error) {
      return res.status(500).json({
        success: true,
        message: req.i18n_texts.ERROR,
        error,
      });
    }
  }

  async removeFile(req, res) {
    try {
      const { fileRef: fileId } = req.body;

      const job = await Job.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: {
            fileRef: fileId,
          },
        },
      );

      return res.status(200).json({
        success: true,
        data: job,
      });
    } catch (error) {
      return res.status(500).json({
        success: true,
        message: req.i18n_texts.ERROR,
        error,
      });
    }
  }

  async update(req, res) {
    try {
      const currentDate = { };

      if (req.body.status === 'done') {
        currentDate.doneDay = true;
      } else {
        req.body.doneDay = null;
      }

      const job = await Job.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: req.body,
          $currentDate: currentDate,
        },
      );

      return res.status(200).json({
        success: true,
        data: job,
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
      await Job.deleteOne({ _id: req.params.id });

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
      const fileUpload = req.file;

      if (!fileUpload) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
      }
      return res.send(fileUpload);
    } catch (error) {
      return res.send('Lỗi');
    }
  }

  uploadMultiFile(req, res, next) {
    const fileUpload = req.files;

    if (!fileUpload) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    return res.send(fileUpload);
  }

  async detail(req, res) {
    try {
      const job = await Job.findOne({ _id: req.params.id }).populate({
        path: 'fileRef',
      });

      return res.json({
        success: true,
        data: job,
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
