//all db players 
const Player = require('../models/player');

class allPLayersController {
    getAllPlayers (req,res){

        res.send ('All PLayers Page');
    }
}

module.exports = new allPLayersController();