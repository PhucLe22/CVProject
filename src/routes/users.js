const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.post('/home', userController.check);
router.get('/login', userController.login);
router.post('/store', userController.store);
router.get('/create', userController.create);
router.get('/:slug', userController.show);
router.get('/', userController.index);

module.exports = router;
