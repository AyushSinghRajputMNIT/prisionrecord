const express = require('express');
const caseController = require('../controllers/caseController');

const router = express.Router();

router.route('/').get(caseController.getCases);
router.route('/').post(caseController.createCase)
router.route('/:id').get(caseController.getCaseById);

module.exports = router