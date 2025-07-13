const Job = require('../models/CV');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const fs = require('fs');
const UploadedFile = require('../models/CV');
const { spawn } = require('child_process');
const path = require('path');

class UploadController {
    index(req, res, next) {
        res.render('cvs/index');
    }
    upload(req, res, next) {
        try {
            if (!req.file)
                return res
                    .status(400)
                    .json({ success: false, message: 'Vui lòng chọn file' });

            console.log('[DEBUG] File uploaded:', req.file.path);
            res.json({
                success: true,
                message: 'File uploaded successfully',
                filePath: req.file.path,
                fileName: req.file.filename,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
}

module.exports = new UploadController();
