// homeController.js

class HomeController {
    getHome(req, res) {
        res.render('home', { title: 'Home Page' });
    }
}

module.exports = new HomeController();