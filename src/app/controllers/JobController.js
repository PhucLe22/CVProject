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
        res.render('jobs/create');
    }
    store(req, res, next) {
        const formData = req.body;

        // ⚠️ Gán businessID từ session
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
