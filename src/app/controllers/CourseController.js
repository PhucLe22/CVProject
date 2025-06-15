const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class CourseController {
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('courses/home', {
                    courses: multipleMongooseToObject(courses), // n objects
                });
            })
            .catch(next);
    }
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug }) // trang con
            .then((course) => {
                res.render('courses/detail', {
                    course: mongooseToObject(course),
                }); //1 object
            });
    }
    create(req, res, next) {
        res.render('courses/create');
    }
    // [post] /course/store
    store(req, res, next) {
        // res.json(req.body)
        const formData = req.body;
        // formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/courses'))
            .catch((error) => {});
        // res.send('Save successfully')
    }
}

module.exports = new CourseController();
