const express = require('express');
const router = express.Router();
const eventTypesController = require('../controllers/event_types');

router.get('/', eventTypesController.listEventTypes);
router.get('/:id', eventTypesController.eventTypeById);

module.exports = router;
