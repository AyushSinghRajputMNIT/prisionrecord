const express = require('express');
const prisonerController = require('../controllers/prisonerController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(authController.protect, prisonerController.getPrisoners);
router.route('/').post(authController.protect, authController.restrict('admin'), prisonerController.createPrisoner)
router.route('/:id').get(prisonerController.getPrisonerById).patch(authController.protect, authController.restrict('admin'), prisonerController.updatePrisoner);

module.exports = router