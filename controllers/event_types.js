const { EventType } = require('../db/models');
const { validateQueryResponse } = require('../utils');

exports.listEventTypes = function(req, res, next) {
  return EventType.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
    // .then(eventTypes =>
    //   res.status(200).render('event_types/index.handlebars', { eventTypes })
    // )
    .then(eventTypes => res.status(200).send(eventTypes))
    .catch(error => res.status(400).send(error));
};

exports.eventTypeById = function(req, res, next) {
  return EventType.findAll({
    where: { id: req.params.id },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
    .then(eventType => validateQueryResponse(eventType, res, next))
    .catch(error => next('Invalid Query'));
};
