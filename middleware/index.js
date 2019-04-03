const { body } = require('express-validator/check');

exports.validateMember = () => {
  return [
    body('name', 'Name must be between 1-30 characters.').isLength({min:1, max:30}).trim().escape(),
    body('title', 'Invalid title').optional().trim().escape(),
    body('guild_id', 'Invalid Guild, should be an integer').isInt(),
    body('isActive', 'Value should be true or false').optional().isBoolean()
  ];
};