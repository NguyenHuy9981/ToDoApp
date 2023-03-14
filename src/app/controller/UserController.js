// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');
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

    const hashPass = await User.hashPass(req.body.password);

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
    const isMatchPass = await User.comparePass(req.body.password, userLogin.password);
    if (!isMatchPass) return res.status(400).send('Mật khẩu không hợp lệ');

    const token = JWT.sign({ _id: userLogin._id }, process.env.SECRET_TOKEN);

    // Lưu Session

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
      });
    } catch (error) {
      return res.send('Loi');
    }
  }

  async forgotPassRequest(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        success: false,
        message: 'Tài khoản không tồn tại',
      });
    }
    const token = uuidv4();

    const tokenReCord = new Token({
      userRef: user._id,
      token,
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
        email: req.body.email,
      },
    });
  }

  async checkTokenForgot(req, res) {
    const resetToken = await Token.findOne({ token: req.body.token });
    if (!resetToken) {
      return res.json({
        success: false,
        message: 'Token không trùng khớp',
      });
    }

    return res.json({
      success: true,
      token: resetToken.token,
    });
  }

  async forgotPassVerify(req, res) {
    try {
      const token = await Token.findOne({ token: req.body.token });
      if (!req.body.password) {
        return res.json({ success: false });
      }
      const hashPass = await User.hashPass(req.body.password);
      await User.updateOne({ _id: token.userRef }, { password: hashPass });
      await Token.deleteMany({ userRef: token.userRef });
      return res.json({ success: true });
    } catch (error) {
      return res.status('400').send('Lỗi');
    }
  }

  async changePass(req, res) {
    try {
      const userLogin = await User.findOne({ _id: req.user._id });
      // Kiểm tra password
      const isMatchPass = await User.comparePass(req.body.oldPass, userLogin.password);
      if (!isMatchPass) {
        return res.json({
          success: false,
          message: 'Mật khẩu cũ không đúng',
        });
      }

      // Mã hóa password
      const hashPass = await User.hashPass(req.body.newPass);

      // Cập nhật mật khẩu
      await User.updateOne(
        { _id: req.user._id },
        { password: hashPass },
      );

      // Xóa Session, fontend xử lý

      return res.json({
        success: true,
      });
    } catch (error) {
      return res.send('Lỗi');
    }
  }

  logout(req, res) {
    try {
      // Xóa Session, fontend xử lý

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.send('Lỗi');
    }
  }
}

module.exports = new UserController();
