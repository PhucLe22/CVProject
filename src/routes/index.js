const newsRouter = require('./news');
const siteRouter = require('./site');
const cartRouter = require('./cart');
const coursesRouter = require('./courses');
const usersRouter = require('./users');
const meRouter = require('./me');
const jobRouter = require('./job');
const cvRouter = require('./cv');
const businessRouter = require('./business');
const adminRouter = require('./admin');
function route(app) {
    app.use('/admin', adminRouter);
    app.use('/business', businessRouter);
    app.use('/cv', cvRouter);
    app.use('/jobs', jobRouter);
    app.use('/me', meRouter); // display
    app.use('/cart', cartRouter);
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/users', usersRouter);
    app.use('/', siteRouter); // homepage
}

module.exports = route;
