const express = require('express');
const router = express.Router();

const demoController = require('../app/controllers/DemoController');

router.use('/', demoController.index); // /demo is default

module.exports = router;
