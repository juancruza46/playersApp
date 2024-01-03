//my players
const player = require('../models/player');

class myPlayersController {
    getMyPlayers(req, res) {

        res.send('My Players')
    }
}

module.exports = new myPlayersController();