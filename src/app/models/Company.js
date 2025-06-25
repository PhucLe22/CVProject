const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const Company = new Schema(
    {
        name: { type: String, require: true },
        img: { type: String },
        map: { type: String },
        adrress: { type: String },
        description: { type: String },
        slug: { type: String, unique: true },
        verifyID: { type: String, unique: true },
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

module.exports = mongoose.model('Compay', Company);
