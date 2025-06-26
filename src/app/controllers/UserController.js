const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');

class UserController {
    index(req, res, next) {
        User.find({})
            .then((users) => {
                res.render('users/userHome', {
                    users: multipleMongooseToObject(users),
                });
            })
            .catch(next);
    }
    show(req, res, next) {
        User.findOne({ slug: req.params.slug }).then((user) => {
            res.render('users/userDetail', { user: mongooseToObject(user) });
        });
    }
    create(req, res, next) {
        res.render('users/create');
    }
    store(req, res, next) {
        const formData = req.body;
        const user = new User(formData);
        user.save()
            .then(() => res.redirect('/users'))
            .catch((error) => {});
        // res.send('Save successfully')
    }

    login(req, res, next) {
        res.render('users/loginPage');
    }

    check(req, res, next) {
        const { email, password } = req.body;
        console.log(req.body.password);

        User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    return res.status(401).send('❌ Email không tồn tại');
                }
                console.log(user.password);
                bcrypt
                    .compare(password, user.password)
                    .then((isMatch) => {
                        console.log('So sánh:', isMatch); // true / false
                    })
                    .catch((err) => {
                        console.error('Lỗi khi so sánh bcrypt:', err);
                    });

                bcrypt.hash('admin123', 10).then((hashed) => {
                    console.log('Hash của admin123:', hashed);
                });

                // So sánh password (nếu đã mã hóa)
                bcrypt.compare(password, user.password).then((isMatch) => {
                    if (!isMatch) {
                        return res.status(401).send('❌ Mật khẩu không đúng');
                    } else {
                        console.log(user._id);
                        req.session.userId = user._id;
                        console.log('session:', req.session.userId);
                        console.log(user.role);
                        if (user.role === 1) {
                            res.render('site');
                        } else if (user.role === 0) {
                            res.render('admin/home');
                        } else {
                            return res
                                .status(403)
                                .send('❌ Không có quyền truy cập phù hợp');
                        }
                    }
                });
            })
            .catch((error) => {
                console.error('[Login Error]', error);
                next(error);
            });
    }
}

module.exports = new UserController();
