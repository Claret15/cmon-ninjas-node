const express = require('express');
const router = express.Router();
const leaguesController = require('../controllers/leagues');

router.get('/', leaguesController.listLeagues);
router.get('/:id', leaguesController.leagueById);

module.exports = router;