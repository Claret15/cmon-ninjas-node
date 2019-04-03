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