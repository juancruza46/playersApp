//all players route
const express = require('express');
const router = express.Router();
const allPlayersController = require('../controllers/allPlayersController');

//test for working connection
router.get('/', (req, res) => {
    res.render('allPlayers', { title: 'All Players', body: '' });
});

module.exports = router;