const mongoose = require('mongoose');

const { Schema } = mongoose;

const Attachment = new Schema({
  name: {
    type: String,
  },
  path: {
    required: true,
    type: String,
  },
  type: {
    type: String,
  },
  file_size: {
    type: String,
  },
  category: {
    type: String,
  },

}, { timestamps: true });

module.exports = mongoose.model('Attachment', Attachment);
