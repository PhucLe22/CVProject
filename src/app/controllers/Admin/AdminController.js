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
            res.redirect('/login'); // hoặc '/business/login' nếu là doanh nghiệp
        }
    }
    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Lỗi khi huỷ session:', err);
                return res.status(500).send('Lỗi đăng xuất');
            }
            res.redirect('/business/login');
        });
    }

    show(req, res, next) {
        Business.find({})
            .then((business) => {
                res.render('admin/businessList', {
                    business: multipleMongooseToObject(business),
                });
            })
            .catch(next);
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
}

module.exports = new AdminController();
