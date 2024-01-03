//all db players 
const Player = require('../models/player');

class allPlayersController {
    async getAllPlayers(req, res) {
        try {
            // Fetch players from the database
            const players = await Player.find();

            // Render the view with player data
            res.render('allPlayers', { title: 'All Players', navbar: 'navbar', playerData: players });
        } catch (error) {
            // Handle error
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new allPlayersController();