const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const Job = new Schema(
    {
        name: { type: String, require: true },
        description: { type: String },
        slug: { type: String, unique: true },
        companyID: { type: Number, require: true },
    },
    {
        timestamps: true,
    },
);
Job.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Job', Job);
