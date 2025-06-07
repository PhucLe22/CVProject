const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')))

// HTTP Logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine({
  extname: '.hbs'
}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views')); //_dirname == contextPath

app.get('/', (req, res) => {
    // res.send('<h2 style = "color:red;">Thien Phuc123</h2>')
    res.render('home'); 
})

app.listen(port, () => { 
  console.log(`Example app listening on port ${port}`)
})
