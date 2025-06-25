const express = require('express');
const router = express.Router();

const jobController = require('../app/controllers/JobController');
router.get('/', jobController.index);
router.get('/create', jobController.create);
router.post('/store', jobController.store);

module.exports = router;
