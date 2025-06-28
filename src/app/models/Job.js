const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const JobSchema = new Schema(
    {
        title: { type: String, required: true }, // tên công việc
        description: { type: String, required: true }, // mô tả công việc
        location: { type: String, required: true }, // địa điểm làm việc
        salary: { type: String, required: true }, // mức lương
        company: { type: String, required: true }, // tên công ty
        logo: { type: String }, // link logo công ty
        contact: { type: String, required: true }, // thông tin liên hệ
        slug: { type: String, unique: true }, // slug để SEO URL
        businessID: {
            type: Schema.Types.ObjectId,
            ref: 'Business',
            required: true,
        }, // id của business lấy từ session
    },
    {
        timestamps: true,
    },
);

// Tự động tạo slug từ title khi save
JobSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Job', JobSchema);
