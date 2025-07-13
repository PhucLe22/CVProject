const Job = require('../models/CV');
// const { mongooseToObject } = require('../../util/mongoose');
// const { multipleMongooseToObject } = require('../../util/mongoose');
const fs = require('fs');
const UploadedFile = require('../models/CV');
const { spawn } = require('child_process');
const path = require('path');

class UploadController {
    index(req, res, next) {
        res.render('cvs/index');
    }
    upload(req, res, next) {
        if (!req.file) return res.status(400).send('Vui lòng chọn file');

        const fileUploadedPath = req.file.path;
        const pythonPath =
            '/Users/mac/Documents/NodeJSDemo/.vscode/python/ingestion.py';
        console.log('[DEBUG] Đường dẫn tới Python script:', pythonPath);
        const python = spawn('python3', [pythonPath, fileUploadedPath]);

        let result = '',
            err = '';

        python.stdout.on('data', (data) => (result += data.toString()));
        python.stderr.on('data', (data) => (err += data.toString()));

        python.on('close', (code) => {
            if (code === 0) res.send(`✅ Python trả về:\n${result}`);
            else res.status(500).send(`❌ Lỗi:\n${err}`);
        });
    }
}

module.exports = new UploadController();
