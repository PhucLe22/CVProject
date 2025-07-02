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

        bcrypt
            .hash(formData.password, 10)
            .then((hashedPassword) => {
                formData.password = hashedPassword;
                const user = new User(formData);
                return user.save();
            })
            .then(() => res.redirect('/users/login')) // chuyển về trang login sau khi đăng ký
            .catch((error) => {
                if (error.code === 11000) {
                    res.status(400).send('❌ Email đã được sử dụng.');
                } else {
                    console.error('[User Store Error]', error);
                    res.status(500).send('❌ Đã xảy ra lỗi khi đăng ký.');
                }
            });
    }

    login(req, res, next) {
        res.render('users/login');
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

                // So sánh password (nếu đã mã hóa)
                bcrypt.compare(password, user.password).then((isMatch) => {
                    if (!isMatch) {
                        return res.status(401).send('❌ Mật khẩu không đúng');
                    } else {
                        console.log(user._id);
                        req.session.userId = user._id;
                        req.session.ava = user.ava;
                        console.log('session:', req.session.userId);
                        console.log(user.role);
                        if (user.role === 1) {
                            res.redirect('/');
                        } else if (user.role === 0) {
                            res.redirect('/admin');
                            // res.render('admin/home', { layout: 'main-admin' });
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

    session(req, res, next) {
        if (!req.session.userId) {
            return res.redirect('/users/login'); // Chưa đăng nhập
        } else {
            res.redirect('/jobs/apply');
        }
    }
}

module.exports = new UserController();
