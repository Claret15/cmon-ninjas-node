const { EventType } = require('../db/models');
const { validateQueryResponse } = require('../utils');
const { validationResult } = require('express-validator/check');

exports.listEventTypes = function(req, res, next) {
  return (
    EventType.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
      // .then(eventTypes =>
      //   res.status(200).render('event_types/index.handlebars', { eventTypes })
      // )
      .then(eventTypes => res.status(200).send(eventTypes))
      .catch(error => res.status(400).send(error))
  );
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

exports.createEventType = async function(req, res, next) {
  // Check if validateEventType() middleware fails and returns error message
  const errors = await validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  // Check if EventType already exists
  let eventTypes = await EventType.findOne({
    where: {
      name: req.body.name
    }
  });

  if (eventTypes != null && eventTypes.name == req.body.name) {
    return res.status(422).json({
      error: 'Event Type already exists'
    });
  }

  return EventType.create({
    name: req.body.name
  })
    .then(eventType =>
      res.status(201).send({ eventType, success: 'Event Type added' })
    )
    .catch(error => {
      return res.status(400).json({
        error: 'Unable to create Event Type'
      });
    });
};
