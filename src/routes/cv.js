const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); // Dùng middleware đúng cấu hình

const uploadController = require('../app/controllers/UploadController');

router.get('/', uploadController.index);
router.post('/upload', upload.single('cvFile'), uploadController.upload);

module.exports = router;
