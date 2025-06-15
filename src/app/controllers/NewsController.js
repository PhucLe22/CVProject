class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }
    // [GET] /news/...
    show(req, res) {
        res.render('newsDetail');
    }
}

module.exports = new NewsController();

// const newsController = require('./NewsController');
