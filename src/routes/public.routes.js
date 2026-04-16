const { Router } = require('express');
const { query } = require('express-validator');
const eventTypeController = require('../controllers/eventType.controller');
const availabilityController = require('../controllers/availability.controller');
const validate = require('../middlewares/validate');

const router = Router();

// GET /api/v1/public/:username/:slug
router.get('/:username/:slug', eventTypeController.getPublic);

// GET /api/v1/public/:username/:slug/slots?date=YYYY-MM-DD
router.get(
  '/:username/:slug/slots',
  [query('date').isISO8601().withMessage('date must be YYYY-MM-DD.')],
  validate,
  availabilityController.getSlots
);

module.exports = router;
