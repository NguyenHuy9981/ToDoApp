const Job = require('../models/Job');

class ToDoController {
  index(req, res) {
    console.log(req.user.id);

    Job.find({ $or: [{ status: 'unfinish' }, { status: 'finish' }], $and: { author: req.user.id } })
      .then((job) => res.status(200).json(job))
      .catch(res.status(500));
  }

  async create(req, res) {
    const filter = { name: req.body.name };
    const update = { status: 'unfinish' };

    try {
      const jobUpdated = await Job.findOneAndUpdate(filter, update);

      if (!jobUpdated) {
        const job = new Job({
          name: req.body.name,
          author: req.user._id,
        });

        const saved = await job.save();

        res.json({
          success: true,
          message: 'Tao loi',
          data: saved,
        });
      } else {
        res.status(200).json({
          success: true,
          message: req.i18n_texts.CREATE_ERROR,
          data: jobUpdated,
        });
      }
    } catch (error) {
      res.json({
        success: false,
        message: req.i18n_texts.CREATE_ERROR,
        data: null,
      });
    }
  }

  update(req, res) {
    Job.updateOne({ _id: req.params.id }, req.body)
      .then(
        res.send('Update Successfully'),
      )
      .catch(res.status(500));
  }
}

module.exports = new ToDoController();
