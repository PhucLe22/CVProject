const Course = require('../models/Business');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const Business = require('../models/Business');

class AdminController {
    index(req, res, next) {
        if (req.session.userId) {
            res.render('admin/home', { layout: 'main-admin' });
        } else {
            res.redirect('/login');
        }
    }

    async search(req, res, next) {
        try {
            const listCourses = await Course.find({});
            let keyWord = req.body.keyWord;
            let foundedCourses = null;
            for (let course in listCourses) {
                if (
                    course.name &&
                    course.name.toLowerCase().include(keyWord.toLowerCase())
                ) {
                    foundedCourses.push(course);
                    break;
                }
            }
            if (foundedCourses) {
                render('/home', {
                    courses: multipleMongooseToObject(foundedCourses),
                });
            }
        } catch (err) {
            next(err);
        }
    }

    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Lỗi khi huỷ session:', err);
                return res.status(500).send('Lỗi đăng xuất');
            }
            res.redirect('/home');
        });
    }

    show(req, res, next) {
        Business.find({})
            .then((business) => {
                res.render('admin/business/list', {
                    business: multipleMongooseToObject(business),
                    layout: 'main-admin',
                });
            })
            .catch(next);
    }

    display(req, res, next) {
        Business.findOne({ slug: req.params.slug }) // trang con
            .then((business) => {
                res.render('admin/business/detail', {
                    business: mongooseToObject(business),
                }); //1 object
            })
            .catch(next);
    }

    async display(req, res, next) {
        try {
            const business = Business.findOne({ slug: req.params.slug }).then(
                (business) => {
                    res.render('admin/business/detail', {
                        business: mongooseToObject(business),
                    });
                },
            );
        } catch (err) {
            next(err);
        }
    }

    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('/business/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }
    update(req, res, next) {
        console.log('PUT /admin/business/:id/status called');
        console.log('Params:', req.params);
        console.log('Body:', req.body);

        const businessId = req.params.id;
        const newStatus = req.body.status;

        Business.updateOne({ _id: businessId }, { status: newStatus })
            .then((result) => {
                console.log('Update result:', result);
                res.json({ success: true, message: 'Status updated' });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: 'Server error',
                });
            });
    }
}

module.exports = new AdminController();
