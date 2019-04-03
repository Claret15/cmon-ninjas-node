const { body } = require('express-validator/check');

exports.validateMember = () => {
  return [
    body('name', 'Name must be between 1-30 characters.').isLength({min:1, max:30}).trim().escape(),
    body('title', 'Invalid title').optional().trim().escape(),
    body('guild_id', 'Invalid Guild, should be an integer').isInt(),
    body('isActive', 'Value should be true or false').optional().isBoolean()
  ];
};

exports.validateGuild = () => {
  return [
    body('name', 'Name must be between 1-25 characters.').isLength({min:1, max:25}).trim().escape(),
  ];
};

exports.validateLeague = () => {
  return [
    body('name', 'Name must be between 1-20 characters.').isLength({min:1, max:20}).trim().escape(),
  ];
};

exports.validateEventType = () => {
  return [
    body('name', 'Name must be between 1-20 characters.').isLength({min:1, max:20}).trim().escape(),
  ];
};

exports.validateEvent = () => {
  return [
    body('name', 'Name must be between 1-50 characters.').isLength({min:1, max:50}).trim().escape(),
    body('eventType_id', 'Invalid Event Type, should be an integer').isInt(),
    body('date', 'Date format: YYYY-MM-DD').isISO8601()
  ];
};

exports.validateEventStat = () => {
  return [
    body('member_id').isInt(),
    body('event_id').isInt(),
    body('guild_id').isInt(),
    body('guildPts').isNumeric({no_symbols:true}),
    body('position', 'Must be between 1 - 30').isInt({max:30}),
    body('soloPts').isNumeric({no_symbols:true}),
    body('league_id').isInt(),
    body('soloRank', 'Must be between 1 - 210').isInt({max:210}),
    body('globalRank', 'Must be a number').isInt()
  ];
};
