//home route
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/',(req, res) => {
    res.render('home', { title: 'Home Page', body: '' });
});

module.exports = router;