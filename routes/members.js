const express = require('express');
const router = express.Router();
const membersController = require('../controllers/members');
const EventStatsController = require('../controllers/event_stats');
const { validateMember, validateEventStat } = require('../middleware');

router.get('/', membersController.membersAll);
router.get('/:id', membersController.membersById);
router.get('/:id/events', EventStatsController.memberEventStats);
router.get('/:id/events/:event_id', EventStatsController.memberEventStatsById);

router.post('/', validateMember(), membersController.createMember);
router.post('/:id/events', validateEventStat(), EventStatsController.createMemberEventStat);

router.put('/:id', validateMember(), membersController.updateMember);
router.put('/:id/events/:event_id', validateEventStat(), EventStatsController.updateMemberEventStat);

router.delete('/:id', membersController.deleteMember);

module.exports = router;
