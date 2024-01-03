//home route
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/',(req, res) => {
    res.render('home', { navbar: 'navbar' });
});

module.exports = router;