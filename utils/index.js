/**
 * Check if Sequelize Query is valid.
 *
 * If there is no record, Sequelize will return a valid reponse
 * with an empty object.
 *
 */
exports.validateQueryResponse = function(response, res) {
  if (Object.keys(response).length === 0) {
    res.status(404).json({ error: 'Not Found' });
  } else {
    res.status(200).send(response);
  }
};
