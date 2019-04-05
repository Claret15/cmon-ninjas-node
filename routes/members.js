const express = require('express');
const router = express.Router();
const membersController = require('../controllers/members');
const EventStatsController = require('../controllers/event_stats');
const { validateMember, validateEventStat } = require('../middleware');

// Members Routes
router.get('/', membersController.membersAll);
router.get('/:id', membersController.membersById);

router.post('/', validateMember(), membersController.createMember);
router.put('/:id', validateMember(), membersController.updateMember);
router.delete('/:id', membersController.deleteMember);

//Member Event Stats Routes
router.get('/:id/events', EventStatsController.memberEventStats);
router.get('/:id/events/:event_id', EventStatsController.memberEventStatsById);

router.post(
  '/:id/events',
  validateEventStat(),
  EventStatsController.createMemberEventStat
);
router.put(
  '/:id/events/:event_id',
  validateEventStat(),
  EventStatsController.updateMemberEventStat
);
router.delete(
  '/:id/events/:event_id',
  EventStatsController.deleteMemberEventStat
);

module.exports = router;
