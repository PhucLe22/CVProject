// library
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const session = require('express-session');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true })); // cho form HTML
app.use(express.json()); // cho fetch/ajax hoặc postman

app.use(methodOverride('_method'));

// Middleware session
app.use(
    session({
        secret: 'secret-key-abc123', // Bạn nên dùng 1 chuỗi random dài
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // false nếu chạy localhost HTTP
    }),
);

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
