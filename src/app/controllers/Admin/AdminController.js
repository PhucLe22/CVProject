const Course = require('../../models/Business');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const { mongooseToObject } = require('../../../util/mongoose');
const Business = require('../../models/Business');

class AdminController {
    index(req, res, next) {
        if (req.session.userId) {
            // Nếu đã đăng nhập thì render trang admin
            res.render('admin/home', { layout: 'main-admin' });
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

    // logout(req, res, next) {
    //     req.session.destroy((err) => {
    //         if (err) {
    //             console.error('Lỗi khi logout:', err);
    //             return next(err);
    //         }

    //         // Xoá cookie (nếu muốn)
    //         res.clearCookie('connect.sid');

    //         // Chuyển hướng sau khi logout
    //         res.redirect('/user/login');
    //     });
    // }

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
