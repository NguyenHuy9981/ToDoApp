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
  fileRef: [{
    type: Schema.Types.ObjectId,
    ref: 'Attachment',
  }],
  processingDay: {
    type: Date,
  },
  doneDay: {
    type: Date,
  },
  authorRef: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

Job.pre('findOneAndUpdate', function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  this.options.returnOriginal = false;
  next();
});

module.exports = mongoose.model('Job', Job);
