//search players route
const express = require('express');
const router = express.Router();
const searchPlayersController = require('../controllers/searchPlayersController');

router.get('/', searchPlayersController.searchPlayers);


module.exports = router;
