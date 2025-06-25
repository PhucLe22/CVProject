const Job = require('../models/Job');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class JobController {
    index(req, res, next) {
        Job.find({})
            .then((jobs) => {
                res.render('jobs/home', {
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
        const job = new Job(formData);

        job.save()
            .then(() => res.redirect('/jobs'))
            .catch((error) => {
                console.error('Error saving job:', error);
                res.status(500).send('Đã có lỗi xảy ra khi lưu công việc.');
            });
        res.send('Save successfully');
    }
}

module.exports = new JobController();
