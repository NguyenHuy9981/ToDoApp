const mongoose = require('mongoose');

module.exports = {
  isEmptyObject(obj) {
    return !Object.keys(obj).length;
  },
  strToObjectId(str) {
    return mongoose.Types.ObjectId(str);
  },
};
