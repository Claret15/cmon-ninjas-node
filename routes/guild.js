const express = require('express');
const router = express.Router();
const guildsController = require('../controllers/guilds');
const guildStatsController = require('../controllers/guild_stats');

router.get('/', guildsController.listGuilds);
router.get('/:id', guildsController.guildsById);
router.get('/:id/events/:event_id', guildStatsController.guildEventStatsById);

module.exports = router;