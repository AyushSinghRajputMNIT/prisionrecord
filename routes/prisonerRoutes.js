const express = require('express');
const prisonerController = require('../controllers/prisonerController');

const router = express.Router();

router.route('/').get(prisonerController.getPrisoners);
router.route('/').post(prisonerController.createPrisoner)
router.route('/:id').get(prisonerController.getPrisonerById);

module.exports = router