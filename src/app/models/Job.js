const mongoose = require('mongoose');

const { Schema } = mongoose;

const Job = new Schema({
  name: {
    type: String,
    maxLength: 255,
    require: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['unfulfilled', 'processing', 'done'],
    default: 'unfulfilled',
  },
  checkBox: [{
    name: {
      type: String,
      maxLength: 255,
      require: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  }],
  file: [{
    type: String,
  }],
  authorRef: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

}, { timestamps: true });

module.exports = mongoose.model('Job', Job);
