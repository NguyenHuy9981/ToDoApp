const mongoose = require('mongoose');

const { Schema } = mongoose;

const Token = new Schema({
  userRef: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  name: {
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
