//all players route
const express = require('express');
const router = express.Router();
const allPlayersController = require('../controllers/allPlayersController');

//get all playerss
router.get('/', allPlayersController.getAllPlayers);

module.exports = router;