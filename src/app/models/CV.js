const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CV = new Schema(
    {
        name: { type: String, required: true }, // Tên ứng viên

        contactInformation: {
            phone: String,
            emailAddress: { type: String, unique: true, sparse: true },
            address: String,
        },

        education: [
            {
                schoolName: String,
                degree: String,
                dates: String,
                GPA: String,
            },
        ],

        workExperience: [
            {
                jobTitle: String,
                company: String,
                dates: String,
                responsibilities: String,
            },
        ],

        skills: [String],

        projects: [
            {
                projectName: String,
                description: String,
                technologiesUsed: [String],
                dates: String,
            },
        ],

        achievementsAndHackathons: [String], // có thể là mảng string hoặc sau này đổi thành object

        slug: { type: String, unique: true }, // dùng cho routing
    },
    {
        timestamps: true,
    },
);

// Tự tạo slug từ name nếu chưa có
CV.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('CV', CV);
