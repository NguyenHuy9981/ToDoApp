const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  role: {
    required: true,
    type: String,
    default: 'user',
    enum: ['user', 'manager', 'admin', 'root'],
  },
}, { timestamps: true });

User.statics.hashPass = async function (password) {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

User.statics.comparePass = async function (password, passhash) {
  return bcrypt.compare(password, passhash);
};

module.exports = mongoose.model('User', User);
