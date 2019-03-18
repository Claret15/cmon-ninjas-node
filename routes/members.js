const express = require('express');
const router = express.Router();
const membersController = require('../controllers/members');

/**
 * Using controllers to return JSON response
 **/

router.get('/', membersController.membersAll);
router.get('/:id', membersController.membersById);

module.exports = router;
