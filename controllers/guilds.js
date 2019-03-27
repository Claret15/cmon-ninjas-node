const { Guild, Member } = require('../db/models');
const { validateQueryResponse } = require('../utils');

exports.listGuilds = function(req, res, next) {
  return Guild.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: [
      {
        attributes: {
          exclude: ['guild_id', 'createdAt', 'updatedAt']
        },
        model: Member,
        as: 'members'
      }
    ]
  })
    .then(guilds => res.status(200).send(guilds))
    .catch(error => res.status(400).send(error));
};

exports.guildsById = function(req, res, next) {
  return Guild.findAll({
    where: { id: req.params.id },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: [
      {
        attributes: {
          exclude: ['guild_id', 'createdAt', 'updatedAt']
        },
        model: Member,
        as: 'members'
      }
    ]
  })
    .then(guild => validateQueryResponse(guild, res, next))
    .catch(error => next('Invalid Query'));
};
