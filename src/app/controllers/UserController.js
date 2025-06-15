const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

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
}

module.exports = new UserController();
