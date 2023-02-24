const Attachment = require('../models/Attachment');

class AttachmentController {
  async uploadFile(req, res, next) {
    const myFile = req.file;

    if (!myFile) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }

    const attachment = new Attachment({
      name: myFile.fieldname,
      path: myFile.path,
      type: myFile.mimetype,
      file_size: myFile.size,
    });

    await attachment.save({});

    return res.json({
      success: true,
      data: attachment,
    });
  }
}

module.exports = new AttachmentController();
