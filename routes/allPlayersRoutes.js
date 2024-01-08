// allPlayersRoutes.js

const express = require('express');
const router = express.Router();
const allPlayersController = require('../controllers/allPlayersController');

router.get('/', allPlayersController.getAllPlayers);

module.exports = router;
