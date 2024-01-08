const Player = require('../models/player');

class MyPlayersController {
    async getMyPlayers(req, res) {
        try {
            // Fetch all players from the database
            const players = await Player.find();

            // You can add additional logic here if needed

            res.render('myPlayers', { title: 'My Players', players });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { title: 'Error', error });
        }
    }
}

module.exports = new MyPlayersController();
