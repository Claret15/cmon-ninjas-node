const {
  Member,
  Event,
  EventStat,
  League
} = require('../db/models');
const { validateQueryResponse } = require('../utils');

exports.guildEventStatsById = function(req, res, next) {
  return (
    EventStat.findAll({
      where: {
        guild_id: req.params.id,
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
          }
        },
        {
          model: Event,
          as: 'event',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'eventType_id', 'date']
          }
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
      //   res.status(200).render('event_stats/guilds.handlebars', { eventStats })
      // )
      .then(eventStats => validateQueryResponse(eventStats, res, next))
      .catch(error => next('Invalid Query'))
  );
};
