const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { CacheUser } = require('../helper/cache');

module.exports = {
  async verifyToken(req, res, next) {
    try {
      const token = req.header('auth_token');

      if (!token) return res.status(401).send('Vui lòng đăng nhập để được truy cập');
      const verifyUser = jwt.verify(token, process.env.SECRET_TOKEN);

      const Cache = new CacheUser(verifyUser._id);
      req.user = await Cache.get();

      if (!req.user) {
        req.user = await User.findById(verifyUser._id);
        await Cache.set(req.user);
      }

      return next();
    } catch (err) {
      return res.status(400).send('Token không hợp lệ');
    }
  },
};
