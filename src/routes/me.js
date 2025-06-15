const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.use('/', meController.index);

module.exports = router;
