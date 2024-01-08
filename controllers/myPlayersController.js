//----Declare dependencies----
const Player = require('../models/player');

//----Create a class ----
class MyPlayersController {
    async getMyPlayers(req, res) {
        try {
            // Fetch all players from the database
            const players = await Player.find();

            //Renders all created players
            res.render('myPlayers', { title: 'My Players', players });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { title: 'Error', error });
        }
    }
}
//----Export module ----
module.exports = new MyPlayersController();
