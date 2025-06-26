const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/Admin/AdminController');

router.put('/business', adminController.edit);
router.get('/business', adminController.show);
router.get('/', adminController.index);

module.exports = router;
