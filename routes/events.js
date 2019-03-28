const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');

router.get('/', eventsController.listEvents);
router.get('/:id', eventsController.eventById);

module.exports = router;
