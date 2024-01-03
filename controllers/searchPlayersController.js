const Player = require('../models/player');

class SearchPlayersController {
    searchPlayers(req, res) {

        res.send('Search Players');
    }
}


module.exports = new SearchPlayersController();