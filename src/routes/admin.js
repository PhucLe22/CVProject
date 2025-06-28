const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/Admin/AdminController');

router.get('/logout', adminController.logout);
router.get('/:slug', adminController.display);
router.get('/business', adminController.show);
router.get('/', adminController.index);

module.exports = router;
