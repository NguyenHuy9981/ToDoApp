const mongoose = require('mongoose');

const { Schema } = mongoose;

const Comment = new Schema({
  content: {
    type: String,
    maxLength: 255,
    require: true,
  },
  jobRef: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
  },
  userRef: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Comment', Comment);
