const sessionStorage = require('sessionstorage-for-nodejs');

module.exports = {
  sessionAuth(req, res, next) {
    try {
      const sessionUser = sessionStorage.getItem(`user:${req.user._id}`);
      if (!sessionUser) {
        return res.status(401).send('Phiên hết hạn, vui lòng đăng nhập lại');
      }
      return next();
    } catch (err) {
      return res.status(400).send('Lỗi');
    }
  },
};
