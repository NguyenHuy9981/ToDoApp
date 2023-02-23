const mongoose = require('mongoose');

const Job = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 255,
  },
  status: {
    type: String,
    enum: ['unfinish', 'finish', 'disable'],
    default: 'unfinish',
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', Job);
