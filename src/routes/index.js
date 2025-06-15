const newsRouter = require('./news');
const siteRouter = require('./site');
const cartRouter = require('./cart');
const coursesRouter = require('./courses');
const usersRouter = require('./users');
const demoRouter = require('./demo');
const meRouter = require('./me');

function route(app) {
    app.use('/me', meRouter); // display
    app.use('/cart', cartRouter);
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/users', usersRouter);
    app.use('/demo', demoRouter);
    app.use('/', siteRouter); // homepage
}

module.exports = route;
