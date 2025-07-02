const express = require('express');
const router = express.Router();

const jobController = require('../app/controllers/JobController');

router.get('/create', jobController.create);
router.get('/apply', jobController.apply);
router.get('/:slug', jobController.show);
router.post('/store', jobController.store);

module.exports = router;
