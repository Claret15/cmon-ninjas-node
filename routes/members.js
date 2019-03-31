const express = require('express');
const router = express.Router();
const membersController = require('../controllers/members');
const EventStatsController = require('../controllers/event_stats');

router.get('/', membersController.membersAll);
router.get('/:id', membersController.membersById);
router.get('/:id/events', EventStatsController.memberEventStats);
router.get('/:id/events/:event_id', EventStatsController.memberEventStatsById);

module.exports = router;
