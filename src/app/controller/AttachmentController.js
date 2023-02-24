const pathUpload = require('../../config/path').upload;
const Attachment = require('../models/Attachment');

class AttachmentController {
  async uploadFile(req, res, next) {
    const upload = req.file;

    if (!upload) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }

    const attachment = new Attachment({
      name: upload.fieldname,
      path: upload.path,
      type: upload.mimetype,
      file_size: upload.size,
      userRef: req.user._id,
    });

    await attachment.save();

    return res.json({
      success: true,
      data: attachment,
    });
  }

  async downloadFile(req, res) {
    try {
      const { id } = req.params;
      const file = await Attachment.findOne({
        _id: id,
        userRef: req.user._id,
      });

      const result = pathUpload.get(file.path);

      return res.sendFile(result);
    } catch (error) {
      return res.send('No file');
    }
  }
}

module.exports = new AttachmentController();
