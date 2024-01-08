//Get back home
class HomeController {
    getHome(req, res) {
        res.render('home', { title: 'Home Page' });
    }
}
//----Export module ----
module.exports = new HomeController();