const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MyCourseController {
    stored(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MyCourseController();
