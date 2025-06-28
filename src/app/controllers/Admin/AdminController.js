const Course = require('../../models/Business');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const { mongooseToObject } = require('../../../util/mongoose');
const Business = require('../../models/Business');

class AdminController {
    index(req, res, next) {
        if (req.session.businessEmail || req.session.userId) {
            // Nếu đã đăng nhập thì render trang admin
            res.render('admin/home');
        } else {
            // Nếu chưa đăng nhập thì chuyển về trang login
            res.redirect('/login');
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
                });
            })
            .catch(next);
    }

    display(req, res, next) {
        Business.findOne({ slug: req.params.slug }) // trang con
            .then((business) => {
                console.log('haha');
                res.render('admin/business/detail', {
                    business: mongooseToObject(business),
                }); //1 object
            });
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

    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Lỗi khi logout:', err);
                return next(err);
            }

            // Xoá cookie (nếu muốn)
            res.clearCookie('connect.sid');

            // Chuyển hướng sau khi logout
            res.redirect('/user/login');
        });
    }
}

module.exports = new AdminController();
