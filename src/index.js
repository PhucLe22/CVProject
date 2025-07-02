// library
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
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

// Connect to DB
db.connect();

app.engine(
    'hbs',
    exphbs.engine({
        extname: '.hbs',
        helpers: handlebarsHelpers,
    }),
);

app.use(express.urlencoded({ extended: true })); // cho form HTML
app.use(express.json()); // cho fetch/ajax hoặc postman

// Middleware session
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret-key-abc123',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // false khi dùng localhost (không có HTTPS)
    }),
);

// Middleware setLocals (sau khi có session)
app.use((req, res, next) => {
    res.locals.currentUser = req.session.users || null;
    res.locals.currentBusiness = req.session.business || null;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); //_dirname == contextPath

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
