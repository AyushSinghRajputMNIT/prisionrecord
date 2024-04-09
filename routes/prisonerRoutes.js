const express = require('express');
const prisonerController = require('../controllers/prisonerController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(authController.protect, prisonerController.getPrisoners);
router.route('/').post(authController.protect, authController.restrict, prisonerController.createPrisoner)
router.route('/:id').get(prisonerController.getPrisonerById).patch(authController.protect, authController.restrict, prisonerController.updatePrisoner);

module.exports = router