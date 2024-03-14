const express = require('express');
const prisonerController = require('../controllers/prisonerController');

const router = express.Router();

router.route('/').get(prisonerController.getPrisoners);
router.route('/:id').get(prisonerController.getPrisonerById);
router.route('/addPrisoner').post(prisonerController.createPrisoner)

module.exports = router