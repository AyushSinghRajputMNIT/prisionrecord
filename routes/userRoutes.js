const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/logout').get(authController.logout);
router.route('/login').post(authController.login);
router.route('/signup').post(authController.signup);

router.use(authController.protect);

router.route('/:id').patch(userController.updateUser);

router.use(authController.restrict('admin'));

router.route('/').get(userController.getAllUser);
router.get(':/id', userController.getUser);
module.exports = router;