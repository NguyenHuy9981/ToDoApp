const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { CacheUser } = require('../helper/cache');
const { strToObjectId } = require('../helper/utils');

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
        if (req.user) {
          await Cache.set(req.user);
        }
      }

      if (req.user) {
        req.user.objectId = strToObjectId(req.user._id);
        return next();
      }

      throw 'USER_NOT_FOUND';
    } catch (err) {
      return res.status(400).send('Token không hợp lệ');
    }
  },
};
