const mongoose = require('mongoose');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const Business = new Schema(
    {
        name: { type: String, required: true },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'suspended'], // trạng thái hợp lệ
            default: 'pending',
        },
        taxId: { type: String, required: true, unique: true },
        email: {
            type: String,
            required: true,
            // unique: true,
            match: [/.+@.+\..+/, 'Email không hợp lệ'],
        },
        phone: { type: String },
        address: { type: String },
        password: { type: String },
        scale: { type: String }, // Quy mô (ví dụ: '10-50', '100-200')
        capital: { type: String }, // Vốn điều lệ
        website: { type: String }, // Website doanh nghiệp
        logo: { type: String, maxLength: 255 },
        description: { type: String },
        approvedAt: {
            type: Date, // null nếu chưa được duyệt
            default: null,
        },
        slug: { type: String, unique: true },
    },
    {
        timestamps: true,
    },
);

// Middleware: tạo slug và mã hóa mật khẩu trước khi lưu
Business.pre('save', async function (next) {
    // Tạo slug
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }

    // Mã hóa mật khẩu nếu mới hoặc bị thay đổi
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    next();
});

module.exports = mongoose.model('Business', Business);
