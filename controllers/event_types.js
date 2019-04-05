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

exports.updateEventType = async function(req, res, next) {
  // Check if validateEventType() middleware fails and returns error message
  const errors = await validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  // Check if EventType does not exist
  let foundEventType = await EventType.findOne({
    where: {
      id: req.params.id
    }
  });

  if (foundEventType == null) {
    return res.status(422).json({
      error: 'Event Type does not exist'
    });
  }

  return foundEventType
    .update({
      name: req.body.name
    })
    .then(eventType =>
      res.status(201).send({ eventType, success: 'Event Type updated' })
    )
    .catch(error => {
      return res.status(400).json({
        error: 'Unable to update Event Type'
      });
    });
};

exports.deleteEventType = async function(req, res, next) {
  try {
    let foundEventType = await EventType.findOne({
      where: { id: req.params.id }
    });
    await foundEventType.destroy();

    return res
      .status(200)
      .send({ foundEventType, success: 'Event Type deleted' });
  } catch (err) {
    return res.status(404).send({ error: 'Event Type does not exist' });
  }
};
