//my players
class myPlayersController {
    getMyPlayers(req, res) {
        res.render('myPlayers', { title: 'My Players', body: '' });
    }
}

module.exports = new myPlayersController();