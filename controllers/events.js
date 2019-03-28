const { Event } = require('../db/models');
const { validateQueryResponse } = require('../utils');

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
