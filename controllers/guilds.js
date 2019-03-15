const { Guild, Member } = require('../db/models');

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
  return Guild.findById(req.params.id, {
    include: [
      {
        model: Member,
        as: 'members'
      }
    ]
  })
    .then(guilds => res.status(200).send(guilds))
    .catch(error => res.status(400).send(error));
};
