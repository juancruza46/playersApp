const express = require('express');
const router = express.Router();
const allPlayersController = require('../controllers/allPlayersController');

//get the like players
router.get('/', allPlayersController.getAllPlayers);

module.exports = router;