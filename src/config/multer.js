const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tạo thư mục 'uploads/' nếu chưa tồn tại
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Cấu hình nơi lưu file và giữ tên gốc
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

// Export middleware multer
const upload = multer({ storage });
module.exports = upload;
