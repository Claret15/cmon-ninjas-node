const { League } = require('../db/models');

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
