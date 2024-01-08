const express = require('express');
const router = express.Router();
const Player = require('../models/player'); // Make sure the path is correct

router.get('/', (req, res) => {
    res.render('addPlayers', { title: 'Add Player' });
});

router.post('/', async (req, res) => {
    try {
        console.log('Form submitted!');
        const { name, position, nationality, shirtNumber } = req.body;

        // Save the player to the database
        const newPlayer = new Player({
            name,
            position,
            nationality,
            shirtNumber,
        });

        await newPlayer.save();

        res.redirect('/myPlayers');
    } catch (error) {
        console.error(error);

        if (error.name === 'MongoError' && error.message.includes('timed out')) {
            // Handle timeout error
            res.status(500).render('error', { title: 'Error', error: 'MongoDB operation timed out' });
        } else {
            res.status(500).render('error', { title: 'Error', error });
        }
    }
});

module.exports = router;
