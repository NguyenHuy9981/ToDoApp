// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const UserValidation = require('../validators/UserValidation');
const Token = require('../models/Token');
// const Mail = require('../email/sendEmail');

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

    // Lưu Session
    req.session.user = userLogin._id;

    return res.status(200).json({
      success: true,
      data: {
        user: userLogin,
        access_token: token,
      },
    });
  }

  async me(req, res) {
    try {
      const user = await User.findOne({ _id: req.user._id }, {
        password: false,
      });

      return res.json({
        success: true,
        data: user,
        tokin: req.session.user,
      });
    } catch (error) {
      return res.send('Loi');
    }
  }

  async forgotPass(req, res) {
    const token = uuidv4();

    const tokenReCord = new Token({
      userRef: req.user._id,
      name: token,
    });

    await tokenReCord.save();

    // const senderEmail = 'Nguyenhuy129981@gmail.com';
    // const receiverEmail = 'vuongsieu9981@gmail.com';
    // const emailSubject = 'Mailgun Demo';
    // const emailBody = `${process.env.DOMAIN}/${req.user._id}/${token}`;

    // User-defined function to send email
    // Mail.sendMail(senderEmail, receiverEmail, emailSubject, emailBody);

    return res.json({
      success: true,
      data: {
        token,
      },
    });
  }

  async resetPass(req, res) {
    const userLogin = await User.findOne({ _id: req.user._id });
    // Kiểm tra password
    const passLogin = await bcrypt.compare(req.body.oldPass, userLogin.password);
    if (!passLogin) return res.status(400).send('Mật khẩu không hợp lệ');

    // Mã hóa password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.newPass, salt);

    // Cập nhật mật khẩu
    await User.updateOne(
      { _id: req.user._id },
      { password: hashPass },
    );

    // Xóa Session
    req.session.destroy();

    return res.json({
      success: true,
    });
  }

  logout(req, res) {
    if (req.session) {
      // Xóa Session
      req.session.destroy((err) => {
        if (err) {
          return res.json({ err });
        }
        return res.json({ logout: 'Success' });
      });
    }
  }
}

module.exports = new UserController();
