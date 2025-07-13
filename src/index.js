const express = require('express');
const path = require('path');
// const { engine } = require('express-handlebars');
// const morgan = require('morgan');
const port = process.env.PORT || 3000;
const app = express();
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const session = require('express-session');
const hbs = require('express-handlebars');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const handlebarsHelpers = require('../src/helpers/handlebars');

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);

db.connect();

app.engine(
    'hbs',
    exphbs.engine({
        extname: '.hbs',
        helpers: handlebarsHelpers,
    }),
);

// app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true })); // cho form HTML
app.use(express.json()); // cho fetch/ajax hoặc postman

app.use(express.static(path.join(__dirname, 'public')));

// Middleware session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 3 * 60 * 60 * 1000,
        },
    }),
);

// Middleware setLocals (sau khi có session)
app.use((req, res, next) => {
    res.locals.currentUser = req.session.users || null;
    res.locals.currentBusiness = req.session.business || null;
    next();
});

app.use(methodOverride('_method'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); //_dirname == contextPath

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const originalLog = console.log;
console.log = (...args) => {
    const str = args.join(' ');
    if (
        str.includes('Example app listening on port') ||
        str.includes('success') ||
        str.includes('Debugger listening')
    ) {
        originalLog(...args);
    }
};

app.use((err, req, res, next) => {
    // Xử lý lỗi tại đây
    console.error('Lỗi:', err.message);
    res.status(err.status || 500).json({
        message: err.message || 'Lỗi máy chủ',
    });
});
