// myPlayersRoutes.js
const express = require('express');
const router = express.Router();
const Player = require('../models/player');
const addPlayersController = require('../controllers/addPlayersController');

// Render the myPlayers page
router.get('/', async (req, res) => {
    try {
        const players = await Player.find({});
        res.render('myPlayers', { title: 'My Players', players });
    } catch (err) {
        console.error('Error fetching players:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
