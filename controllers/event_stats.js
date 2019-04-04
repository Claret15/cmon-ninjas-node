const {
  Member,
  Event,
  EventStat,
  League,
  Guild,
  EventType
} = require('../db/models');
const { validateQueryResponse } = require('../utils');
const { validationResult } = require('express-validator/check');

exports.memberEventStats = function(req, res, next) {
  return (
    EventStat.findAll({
      where: { member_id: req.params.id },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [
        {
          model: Member,
          as: 'member',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'guild_id', 'title', 'isActive']
          },
          include: [
            {
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
              },
              model: Guild,
              as: 'guild'
            }
          ]
        },
        {
          model: Event,
          as: 'event',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'eventType_id']
          },
          include: [
            {
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
              },
              model: EventType,
              as: 'event_type'
            }
          ]
        },
        {
          model: League,
          as: 'league',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'id']
          }
        }
      ]
    })
      // .then(eventStats =>
      //   res.status(200).render('event_stats/index.handlebars', { eventStats })
      // )
      .then(eventStats => validateQueryResponse(eventStats, res, next))
      .catch(error => next('Invalid Query'))
  );
};

exports.memberEventStatsById = function(req, res, next) {
  return (
    EventStat.findAll({
      where: {
        member_id: req.params.id,
        event_id: req.params.event_id
      },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'member_id',
          'event_id',
          'league_id'
        ]
      },
      include: [
        {
          model: Member,
          as: 'member',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'guild_id', 'title', 'isActive']
          },
          include: [
            {
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
              },
              model: Guild,
              as: 'guild'
            }
          ]
        },
        {
          model: Event,
          as: 'event',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'eventType_id']
          },
          include: [
            {
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
              },
              model: EventType,
              as: 'event_type'
            }
          ]
        },
        {
          model: League,
          as: 'league',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'id']
          }
        }
      ]
    })
      // .then(eventStats =>
      //   res.status(200).render('event_stats/index.handlebars', { eventStats })
      // )
      .then(eventStats => validateQueryResponse(eventStats, res, next))
      .catch(error => next('Invalid Query'))
  );
};

exports.createMemberEventStat = async function(req, res, next) {
  // Check if validateMemberEventStat() middleware fails and returns error message
  const errors = await validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  // Check if Event Stat already exists
  let stat = await EventStat.findOne({
    where: {
      member_id: req.body.member_id,
      event_id: req.body.event_id
    }
  });

  if (
    stat != null &&
    stat.member_id == req.body.member_id &&
    stat.event_id == req.body.event_id
  ) {
    return res.status(422).json({
      error: 'Event Stat already exists'
    });
  }

  return EventStat.create({
    member_id: req.body.member_id,
    event_id: req.body.event_id,
    guild_id: req.body.guild_id,
    guildPts: req.body.guildPts,
    position: req.body.position,
    soloPts: req.body.soloPts,
    league_id: req.body.league_id,
    soloRank: req.body.soloRank,
    globalRank: req.body.globalRank
  })
    .then(eventStat =>
      res.status(201).send({ eventStat, success: 'Event Stat added' })
    )
    .catch(error => {
      return res.status(400).json({
        error: 'Unable to create Event Stat'
      });
    });
};

exports.updateMemberEventStat = async function(req, res, next) {
  // Check if validateMemberEventStat() middleware fails and returns error message
  const errors = await validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  // Check if Event Stat does not exist
  let foundStat = await EventStat.findOne({
    where: {
      id: req.params.event_id
    }
  });

  if (foundStat == null) {
    return res.status(422).json({
      error: 'Event Stat does not exist'
    });
  }

  return foundStat
    .update({
      member_id: req.body.member_id,
      event_id: req.body.event_id,
      guild_id: req.body.guild_id,
      guildPts: req.body.guildPts,
      position: req.body.position,
      soloPts: req.body.soloPts,
      league_id: req.body.league_id,
      soloRank: req.body.soloRank,
      globalRank: req.body.globalRank
    })
    .then(eventStat =>
      res.status(201).send({ eventStat, success: 'Event Stat updated' })
    )
    .catch(error => {
      return res.status(400).json({
        error: 'Unable to update Event Stat'
      });
    });
};
