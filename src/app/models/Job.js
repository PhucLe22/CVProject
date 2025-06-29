const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const JobSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        salary: { type: String, required: true },
        contact: { type: String, required: true },
        slug: { type: String, unique: true },
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
