const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  name: { required: true, type: String },
  email: { required: true, type: String },
  password: { required: true, type: String },
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],

}, { timestamps: true });

module.exports = mongoose.model('User', User);
