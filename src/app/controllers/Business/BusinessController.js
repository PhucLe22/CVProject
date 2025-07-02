const { mongooseToObject } = require('../../../util/mongoose');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const Business = require('../../models/Business');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

let otpStore = {}; // { email: '123456' }

class CompanyController {
    index(req, res, next) {
        if (!req.session.businessEmail) {
            return res.redirect('/business/login'); // Chưa đăng nhập, chuyển về trang login
        }

        res.render('business/home', {
            layout: 'main-business',
            businessName: req.session.businsessName, // truyền trực tiếp
        });
        console.log(req.session.businsessName);
    }

    list(req, res, next) {
        if (!req.session.businessID) {
            return res
                .status(401)
                .send('Bạn cần đăng nhập doanh nghiệp để xem tin tuyển dụng.');
        }
        console.log(req.session.businessID);
        Job.find({ businessID: req.session.businessID })
            .then((jobs) => {
                res.render('business/jobs/list', {
                    jobs: multipleMongooseToObject(jobs),
                });
            })
            .catch(next);
    }

    business(req, res, next) {
        res.render('business/register');
    }
    check(req, res, next) {
        const formData = req.body;
        const business = new Business(formData);

        business
            .save()
            .then(() => {
                res.render('business/waiting', {
                    business: mongooseToObject(business),
                });
            })
            .catch((error) => {
                console.error('Lỗi lưu doanh nghiệp:', error);
                res.status(500).send('Đã có lỗi xảy ra!');
            });
    }

    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Lỗi khi logout:', err);
                return next(err);
            }

            // Xoá cookie (nếu muốn)
            res.clearCookie('connect.sid');
            console.log('Session sau khi dang xuat: ', req.session);
            // Chuyển hướng sau khi logout
            res.redirect('/home');
        });
    }

    login(req, res, next) {
        res.render('business/login', {
            layout: 'main',
            noHeader: true,
            noFooter: true,
        });
    }

    inspect(req, res, next) {
        const { email, taxId, password } = req.body;

        Business.findOne({ email, taxId })
            .then(async (business) => {
                if (!business) {
                    return res
                        .status(401)
                        .send('❌ Email hoặc mã số thuế không đúng');
                }

                const isMatch = await bcrypt.compare(
                    password,
                    business.password,
                );
                if (!isMatch) {
                    return res.status(401).send('❌ Mật khẩu không đúng');
                }

                if (business.status !== 'approved') {
                    return res
                        .status(403)
                        .send('❌ Doanh nghiệp chưa được phê duyệt');
                }

                // ✅ Tạo mã OTP
                const otp = Math.floor(
                    100000 + Math.random() * 900000,
                ).toString();

                // ✅ Gửi email
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'lenguyenthienphuc2004@gmail.com',
                        pass: 'rtqtwdcqpmpbbogu',
                    },
                });

                const mailOptions = {
                    from: '"Xác thực OTP" <your.email@gmail.com>',
                    to: req.body.email,
                    subject: 'Mã OTP đăng nhập doanh nghiệp',
                    text: `Mã xác nhận của bạn là: ${otp}`,
                };
                try {
                    await transporter.sendMail(mailOptions);
                    console.log(`📧 Gửi OTP thành công: ${otp}`);

                    // Lưu OTP tạm
                    req.session.otp = otp;
                    req.session.email = email; // cần thiết để lấy lại sau
                    req.session.businessID = business._id;
                    req.session.businessAva = business.logo;
                    req.session.businsessName = business.name;

                    console.log(req.session.businessID);

                    // Gửi form nhập OTP
                    res.render('business/verify-otp', {
                        layout: 'main',
                        noHeader: true,
                        noFooter: true,
                        email, // giữ lại giá trị email
                    });
                } catch (emailErr) {
                    console.error('Lỗi gửi email:', emailErr);
                    res.status(500).send('Không gửi được email xác nhận');
                }
            })
            .catch((err) => {
                console.error('Lỗi khi tìm doanh nghiệp:', err);
                next(err);
            });
    }
    verifyOtp(req, res) {
        const { otp } = req.body;
        console.log(otp);

        const correctOtp = req.session.otp;
        console.log(correctOtp);
        const email = req.session.email;

        if (otp === correctOtp) {
            // Xác thực thành công
            delete req.session.otp;

            req.session.businessEmail = email;
            return res.redirect('/business');
        } else {
            return res.status(401).send('❌ Mã OTP không đúng');
        }
    }
}

module.exports = new CompanyController();
