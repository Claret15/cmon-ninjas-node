const { Guild, Member } = require('../db/models');
const { validateQueryResponse } = require('../utils');
const { validationResult } = require('express-validator/check');

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

exports.createGuild = async function(req, res, next) {
  // Check if validateGuild() middleware fails and returns error message
  const errors = await validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  // Check if Guild already exists
  let guild = await Guild.findOne({
    where: {
      name: req.body.name
    }
  });

  if (guild != null && guild.name == req.body.name) {
    return res.status(422).json({
      error: 'Guild already exists'
    });
  }

  return Guild.create({
    name: req.body.name
  })
    .then(guild => res.status(201).send({ guild, success: 'Guild added' }))
    .catch(error => {
      return res.status(400).json({
        error: 'Unable to create Guild'
      });
    });
};
