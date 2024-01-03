// my players routes
const express = require('express');
const router = express.Router();
const myPlayersController = require('../controllers/myPlayersController');

router.get('/', myPlayersController.getMyPlayers);

module.exports = router;