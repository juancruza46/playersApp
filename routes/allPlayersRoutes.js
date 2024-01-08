//----Declare dep ----
const express = require('express');
const router = express.Router();
const allPlayersController = require('../controllers/allPlayersController');

router.get('/', allPlayersController.getAllPlayers);

//----Export module ----
module.exports = router;
