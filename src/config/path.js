const path = require('path');

module.exports = {
  upload: {
    root: path.join(__dirname, '../../uploads/'),
    get(fileName) {
      return path.join(this.root, '../', fileName);
    },
  },
};
