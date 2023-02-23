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
    enum: ['unfulfilled', 'processing', 'done'],
    default: 'unfinish',
  },
  authorRef: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

}, { timestamps: true });

module.exports = mongoose.model('Job', Job);
