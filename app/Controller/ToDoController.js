const Job = require('../models/Job');

class ToDoController {
  index(req, res) {
    Job.find({ $or: [{ status: 'unfinish' }, { status: 'finish' }] })
      .then((job) => res.status(200).json(job))
      .catch(res.status(500));
  }

  create(req, res) {
    const filter = { name: req.body.name };
    const update = { status: 'unfinish' };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    Job.findOneAndUpdate(filter, update, options)
      .then((job) => res.status(200).json(job))
      .catch(res.status(500));
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
