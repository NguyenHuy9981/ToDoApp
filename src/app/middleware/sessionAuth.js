module.exports = {
  verifyToken(req, res, next) {
    try {
      if (!req.session.user) {
        return res.status(401).send('Phiên hết hạn, vui lòng đăng nhập lại');
      }
      return next();
    } catch (err) {
      return res.status(400).send('Lỗi');
    }
  },
};
