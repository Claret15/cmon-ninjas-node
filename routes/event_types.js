const express = require('express');
const router = express.Router();
const eventTypesController = require('../controllers/event_types');
const { validateEventType } = require('../middleware');

router.get('/', eventTypesController.listEventTypes);
router.get('/:id', eventTypesController.eventTypeById);

router.post('/', validateEventType(), eventTypesController.createEventType);
router.put('/:id', validateEventType(), eventTypesController.updateEventType);

router.delete('/:id', eventTypesController.deleteEventType);

module.exports = router;
