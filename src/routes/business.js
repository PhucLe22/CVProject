const express = require('express');
const router = express.Router();

const businessController = require('../app/controllers/Business/BusinessController');
const { route } = require('./admin');

router.get('/logout', businessController.logout);
router.post('/verify-otp', businessController.verifyOtp);
router.post('/inspect', businessController.inspect);
router.get('/login', businessController.login);
router.post('/check', businessController.check);
router.get('/register', businessController.business);
router.get('/', businessController.index);

module.exports = router;
