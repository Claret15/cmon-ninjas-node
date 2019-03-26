const express = require('express');
const router = express.Router();
const leaguesController = require('../controllers/leagues');

/**
 * Using controllers to return JSON response
 **/

router.get('/', leaguesController.listLeagues);

module.exports = router;