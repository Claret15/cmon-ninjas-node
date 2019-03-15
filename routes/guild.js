const express = require('express');
const router = express.Router();
const guildsController = require('../controllers/guilds');

/**
 * Using controllers to return JSON response
 **/

router.get('/', guildsController.listGuilds);
router.get('/:id', guildsController.guildsById);

module.exports = router;