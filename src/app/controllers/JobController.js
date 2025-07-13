const Job = require('../models/Job');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const session = require('express-session');

class JobController {
    create(req, res, next) {
        console.log('==> Bắt đầu vào create jobs');
        console.log('Session: ', req.session.business);

        if (!req.session.businessID) {
            console.log('Chưa đăng nhập doanh nghiệp, redirect');
            return res.redirect('/business/login');
        }

        console.log('Qua check đăng nhập, chuẩn bị render');
        res.render('jobs/create', {
            layout: 'main-business',
            isBusiness: true,
            business: req.session.business,
        });
    }
    show(req, res, next) {
        Job.findOne({ slug: req.params.slug }) // trang con
            .then((job) => {
                res.render('jobs/detail', {
                    job: mongooseToObject(job),
                });
            });
    }
    store(req, res, next) {
        const formData = req.body;

        if (!req.session.businessID) {
            return res
                .status(401)
                .send('Bạn cần đăng nhập doanh nghiệp để đăng tin.');
        }
        formData.businessID = req.session.businessID;

        const job = new Job(formData);

        job.save()
            .then(() => res.redirect('/jobs'))
            .catch((error) => {
                console.error('Error saving job:', error);
                res.status(500).send('Đã có lỗi xảy ra khi lưu công việc.');
            });
    }

    apply(req, res, next) {
        const userId = req.session.userId;
        const jobId = req.session.jobId;
        Job.findById(jobId)
            .then((job) => {
                if (!job) {
                    return res.status(404).send('❌ Công việc không tồn tại.');
                }

                // Kiểm tra nếu user đã apply rồi thì không thêm nữa
                if (job.applicants.includes(userId)) {
                    return res.send('✅ Bạn đã ứng tuyển công việc này rồi.');
                }

                // Thêm userId vào mảng applicants
                job.applicants.push(userId);

                return job.save();
            })
            .then(() => {
                res.send('✅ Ứng tuyển công việc thành công!');
            })
            .catch((error) => {
                console.error('[Apply Job Error]', error);
                next(error);
            });
    }

    async search(req, res, next) {
        try {
            const { name, description } = req.query;
            const query = {};
            if (name) query.name = { $regex: name, $options: 'i' };
            if (description)
                query.description = { $regex: description, $options: 'i' };
            const jobs = await Job.find(query);
            if (!jobs) res.send('not find');
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new JobController();
