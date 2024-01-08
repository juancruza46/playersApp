const axios = require('axios');
const Player = require('../models/player');

class AddPlayersController {
    getAddPlayersPage(req, res) {
        res.render('addPlayers', { title: 'Add Player' });
    }

    async addPlayers(req, res) {
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
    }

    async getMyPlayersPage(req, res) {
        try {
            // Fetch all players from the database
            const players = await Player.find();

            res.render('myPlayers', { title: 'My Players', players });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { title: 'Error', error });
        }
    }
}

module.exports = new AddPlayersController();


