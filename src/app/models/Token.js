const mongoose = require('mongoose');

const { Schema } = mongoose;

const Token = new Schema({
  userRef: {
    type: String,
    required: true,
    ref: 'user',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

module.exports = mongoose.model('Token', Token);
