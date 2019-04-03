const express = require('express');
const router = express.Router();
const guildsController = require('../controllers/guilds');
const guildStatsController = require('../controllers/guild_stats');
const { validateGuild } = require('../middleware');

router.get('/', guildsController.listGuilds);
router.get('/:id', guildsController.guildsById);
router.get('/:id/events/:event_id', guildStatsController.guildEventStatsById);

router.post('/', validateGuild(), guildsController.createGuild);
router.put('/:id', validateGuild(), guildsController.updateGuild);

module.exports = router;
