const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const UserValidation = require('../validators/UserValidation');

class UserController {
  async register(req, res) {
    // Validate ????????????????
    const { error } = UserValidation.register(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check email có tồn tại không
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email đã tồn tại');

    // Mã hóa password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    // Tạo mới
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = hashPass;

    try {
      const user = await newUser.save();
      const token = JWT.sign({ _id: user._id }, process.env.SECRET_TOKEN);
      return res.status(200).json({
        success: true,
        data: {
          user,
          access_token: token,
        },
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  async login(req, res) {
    // Validate ????????????????
    const { error } = UserValidation.login(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // Kiểm tra email
    const userLogin = await User.findOne({ email: req.body.email });
    if (!userLogin) return res.status(400).send('Không tìm thấy email');

    // Kiểm tra password
    const passLogin = await bcrypt.compare(req.body.password, userLogin.password);
    if (!passLogin) return res.status(400).send('Mật khẩu không hợp lệ');

    const token = JWT.sign({ _id: userLogin._id }, process.env.SECRET_TOKEN);
    return res.status(200).json({
      success: true,
      data: {
        user: userLogin,
        access_token: token,
      },
    });
  }

  async me(req, res) {
    const user = await User.findOne({ _id: req.user._id });
    return res.json({
      success: true,
      data: user,
    });
  }
}

module.exports = new UserController();
