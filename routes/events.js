const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');
const { validateEvent } = require('../middleware');

router.get('/', eventsController.listEvents);
router.get('/:id', eventsController.eventById);

router.post('/', validateEvent(), eventsController.createEvent);
router.put('/:id', validateEvent(), eventsController.updateEvent);

module.exports = router;
