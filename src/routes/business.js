const express = require('express');
const router = express.Router();

const businessController = require('../app/controllers/BusinessController');

router.post('/check', businessController.check);
router.get('/register', businessController.business);
router.get('/', businessController.index);

module.exports = router;
