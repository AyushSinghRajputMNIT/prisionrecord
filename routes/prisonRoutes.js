const express = require('express');
const prisonController = require('../controllers/prisonController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.route('/').get(prisonController.getPrisons);
router.get('/:id', prisonController.getPrisonById);
router.use(authController.restrict('admin'))
router.route('/').post(prisonController.createPrison)
router.route('/:id').patch(prisonController.updatePrison).delete(prisonController.deletePrison);

module.exports = router