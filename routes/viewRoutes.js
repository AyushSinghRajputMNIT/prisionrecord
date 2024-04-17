const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController')

const router = express.Router();

router.use(authController.isLoggedIn)
router.route('/').get(viewController.getHome);
router.route('/cases').get(viewController.getCase);
router.route('/home').get(viewController.getHome);
router.route('/prisoners').get(viewController.getPrisoner);
router.route('/prisons').get(viewController.getPrison);
router.route('/login').get(viewController.getLogin);
router.route('/signup').get(viewController.getSignup);
router.route('/users').get(viewController.getUser);

module.exports = router;