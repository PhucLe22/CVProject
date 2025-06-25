const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Business = require('../models/Business');

class CompanyController {
    index(req, res, next) {
        res.render('business/home');
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
}

module.exports = new CompanyController();
