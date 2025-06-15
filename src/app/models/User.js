const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, minLength: 1, maxLength: 255 },
        ava: { type: String },
        email: { type: String, require: true, unique: true },
        phonenumber: { type: String },
        major: { type: String },
        brithday: { type: Date },
        slug: { type: String, unique: true },
    },
    {
        timestamps: true,
    },
);
// Tự động tạo slug trước khi lưu
User.pre('save', function (next) {
    if (this.isModified('username')) {
        this.slug = slugify(this.username, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('User', User);
