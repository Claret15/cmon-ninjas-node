const { League } = require('../db/models');
const { validateQueryResponse } = require('../utils');

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