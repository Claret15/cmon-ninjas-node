const express = require('express');
const router = express.Router();
const leaguesController = require('../controllers/leagues');
const { validateLeague } = require('../middleware');

router.get('/', leaguesController.listLeagues);
router.get('/:id', leaguesController.leagueById);

router.post('/', validateLeague(), leaguesController.createLeague);

module.exports = router;
