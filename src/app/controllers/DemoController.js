const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class DemoController {
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('demo', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}
module.exports = new DemoController();
