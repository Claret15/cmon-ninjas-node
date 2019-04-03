const { League } = require('../db/models');
const { validateQueryResponse } = require('../utils');
const { validationResult } = require('express-validator/check');

exports.listLeagues = function(req, res, next) {
  return (
    League.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
      // .then(leagues =>
      //   res.status(200).render('leagues/index.handlebars', { leagues })
      // )
      .then(leagues => res.status(200).send(leagues))
      .catch(error => res.status(400).send(error))
  );
};

exports.leagueById = function(req, res, next) {
  return League.findAll({
    where: { id: req.params.id },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
    .then(league => validateQueryResponse(league, res, next))
    .catch(error => next('Invalid Query'));
};

exports.createLeague = async function(req, res, next) {
  // Check if validateLeague() middleware fails and returns error message
  const errors = await validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  // Check if League already exists
  let league = await League.findOne({
    where: {
      name: req.body.name
    }
  });

  if (league != null && league.name == req.body.name) {
    return res.status(422).json({
      error: 'League already exists'
    });
  }

  return League.create({
    name: req.body.name
  })
    .then(league => res.status(201).send({ league, success: 'League added' }))
    .catch(error => {
      return res.status(400).json({
        error: 'Unable to create League'
      });
    });
};
