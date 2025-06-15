const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, required: true },
        slug: { type: String, unique: true },
    },
    {
        timestamps: true,
    },
);

// Tự động tạo slug trước khi lưu
Course.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Course', Course);
