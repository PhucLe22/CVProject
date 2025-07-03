const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/Admin/AdminController');

router.put('/business/:id/status', adminController.update);
router.get('/business', adminController.show);
router.post('/logout', adminController.logout);
router.get('/:slug', adminController.display);
router.get('/', adminController.index);

module.exports = router;
