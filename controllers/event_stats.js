const {
  Member,
  Event,
  EventStat,
  League,
  Guild,
  EventType
} = require('../db/models');
const { validateQueryResponse } = require('../utils');

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
