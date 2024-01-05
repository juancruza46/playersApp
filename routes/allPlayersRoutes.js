const express = require('express');
const router = express.Router();
const allPlayersController = require('../controllers/allPlayersController');

//get the like players
router.get('/', allPlayersController.getAllPlayers);

//post/move the player data to my players page
router.post('/markAsFavorite/:id', allPlayersController.markAsFavorite); 

module.exports = router;