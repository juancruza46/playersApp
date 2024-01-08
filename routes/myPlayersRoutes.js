//---- Declare Dependencies ----
const express = require('express');
const router = express.Router();
const Player = require('../models/player');

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

// Handle the deletion of a player
router.delete('/:id', async (req, res) => {
    try {
        await Player.findByIdAndDelete(req.params.id);
        res.redirect('/myPlayers');
    } catch (err) {
        console.error('Error deleting player:', err);
        res.status(500).send('Error deleting player');
    }
});
 //---- Export module ----
module.exports = router;


