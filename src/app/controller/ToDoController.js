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
      const page = (req.query.page) ? Math.max(0, Number(req.query.page)) : 0;
      const limit = (req.query.limit) ? Math.max(0, Number(req.query.limit)) : 100;
      console.log({
        page,
        limit,
      });
      const listJob = await Job.find(filter)
        .limit(limit)
        .skip(limit * page);

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
        file: req.myFile,
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

  async update(req, res) {
    try {
      const job = await Job.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
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
