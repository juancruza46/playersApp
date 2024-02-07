// utils/middleware.js

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const methodOverride = require('method-override');
const passport = require('passport');

const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated, for example using passport or your own authentication logic
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login'); // Redirect to login if not authenticated
};

const middleware = (app) => {
    app.use(methodOverride('_method'));
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('tiny'));
    app.use(express.static('public'));
    app.use(express.json());

    app.use(
        session({
            secret: process.env.SESSION_SECRET || 'your_strong_secret_key',
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL,
                // Set deprecated options to false
                mongoOptions: {
                    useNewUrlParser: false,
                    useUnifiedTopology: false,
                }
            }),
            saveUninitialized: true,
            resave: false
        })
    );
    
    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = {
    isAuthenticated,
    middleware
};
