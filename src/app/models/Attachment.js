const mongoose = require('mongoose');

const { Schema } = mongoose;

const Attachment = new Schema({
  name: {
    type: String,
  },
  fileName: {
    type: String,
  },
  path: {
    required: true,
    type: String,
  },
  type: {
    type: String,
  },
  fileSize: {
    type: String,
  },
  category: {
    type: String,
  },
  userRef: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Attachment', Attachment);
