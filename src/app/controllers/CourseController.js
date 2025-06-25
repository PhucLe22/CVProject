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
        const formData = req.body;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/courses'))
            .catch((error) => {});
        // res.send('Save successfully')
    }
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/test/stored/courses'))
            .catch(next);
    }
    delete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/test/stored/courses'))
            .catch(next);
    }
}

module.exports = new CourseController();
