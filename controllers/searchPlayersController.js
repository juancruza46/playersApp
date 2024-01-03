const express = require('express');
const router = express.Router();
const Player = require('../models/player');

class SearchPlayersController {
    getSearchPlayers(req, res) {
        res.render('searchPlayers', { title: 'Search Players', body: '' });
    }
}


module.exports = new SearchPlayersController();