const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // stored(req,res, next)
    // {
    //   User.findOne({slug: req.params.slug}) // trang con
    //   .then(user => {
    //     res.render('/stored', {user: mongooseToObject(user)}) //1 object
    //   } )
    // }
    index(req, res, next) {
        User.find({})
            .then((courses) => {
                res.render('users/home', {
                    users: multipleMongooseToObject(users), // n objects
                });
            })
            .catch(next);
    }
}

module.exports = new SiteController();
