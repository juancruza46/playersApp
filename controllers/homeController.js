//home page 
class homeController {
    getHome(req, res) {
        res.send('home');
    }
}


module.exports = new homeController();