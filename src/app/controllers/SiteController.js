const Job = require('../models/Job');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        Job.find({})
            .then((jobs) => {
                res.render('site', {
                    jobs: multipleMongooseToObject(jobs), // n objects
                });
            })
            .catch(next);
    }
    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
