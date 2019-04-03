const { Event } = require('../db/models');
const { validateQueryResponse } = require('../utils');
const { validationResult } = require('express-validator/check');

exports.listEvents = function(req, res, next) {
  return (
    Event.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
      // .then(events =>
      //   res.status(200).render('events/index.handlebars', { events })
      // )
      .then(event => res.status(200).send(event))
      .catch(error => res.status(400).send(error))
  );
};

exports.eventById = function(req, res, next) {
  return Event.findAll({
    where: { id: req.params.id },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
    .then(event => validateQueryResponse(event, res, next))
    .catch(error => next('Invalid Query'));
};

exports.createEvent = async function(req, res, next) {
  // Check if validateEvent() middleware fails and returns error message
  const errors = await validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  // Check if Event already exists
  let event = await Event.findOne({
    where: {
      name: req.body.name
    }
  });

  if (event != null && event.name == req.body.name) {
    return res.status(422).json({
      error: 'Event already exists'
    });
  }

  return Event.create({
    name: req.body.name,
    date: req.body.date,
    eventType_id: req.body.eventType_id
  })
    .then(event => res.status(201).send({ event, success: 'Event added' }))
    .catch(error => {
      return res.status(400).json({
        error: 'Unable to create Event'
      });
    });
};
