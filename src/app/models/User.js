const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },

}, { timestamps: true });

module.exports = mongoose.model('User', User);
