const mongoose = require('mongoose');

const { Schema } = mongoose;

const Job = new Schema({
  name: {
    type: String,
    maxLength: 255,
    require: true,
  },
  status: {
    type: String,
    enum: ['unfinish', 'finish', 'disable'],
    default: 'unfinish',
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },

}, { timestamps: true });

module.exports = mongoose.model('Job', Job);
