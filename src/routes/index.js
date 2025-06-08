const newsRouter = require('./news');
const siteRouter = require('./site');
const cartRouter = require('./cart');

function route(app) {
    app.use('/cart', cartRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;
