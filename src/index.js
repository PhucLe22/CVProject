// library
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;
const route = require('./routes');
//

app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.urlencoded)
// app.use(express.json())

// HTTP Logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views')); //_dirname == contextPath

route(app);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
