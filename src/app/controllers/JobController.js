const Job = require('../models/Job');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class JobController {
    index(req, res, next) {
        if (!req.session.businessID) {
            return res
                .status(401)
                .send('Bạn cần đăng nhập doanh nghiệp để xem tin tuyển dụng.');
        }
        console.log(req.session.businessID);
        Job.find({ businessID: req.session.businessID })
            .then((jobs) => {
                res.render('business/jobs/list', {
                    jobs: multipleMongooseToObject(jobs),
                });
            })
            .catch(next);
    }

    create(req, res, next) {
        console.log('Session: ', req.session.business);
        if (!req.session.businessID) {
            return res.redirect('/business/login'); // hoặc trả về 401
        }
        res.render('jobs/create', {
            layout: 'main-business',
            isBusiness: true,
            business: req.session.business,
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
}

module.exports = new JobController();
