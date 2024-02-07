// ----Declare dependencies----
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const flash = require('express-flash');
require('dotenv').config();
const path = require('path');
const middleware = require('./utils/middleware');
const User = require('./models/user');

// ----Routes ----
const homeRoutes = require('./routes/homeRoutes');
const allPlayersRoutes = require('./routes/allPlayersRoutes');
const myPlayersRoutes = require('./routes/myPlayersRoutes');
const addPlayersRoutes = require('./routes/addPlayersRoutes');

// ----Create Object ----
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the middleware
middleware.middleware(app);

// Passport Configuration
passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// ---- Connect to MongoDB ----
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, {
  
});

const db = mongoose.connection;

db.on('open', () => console.log('Connected to MongoDB'))
  .on('close', () => console.log('Disconnected from MongoDB'))
  .on('error', (err) => console.log('MongoDB connection error:\n', err));

// Use routes
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());  // Added express-flash middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', (req, res, next) => {
    res.locals.user = req.user;
    res.locals.isLoggedIn = req.isAuthenticated();
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Home route
app.use('/', homeRoutes);

// allPlayers route
app.use('/allPlayers', allPlayersRoutes);

// myPlayers route (with authentication middleware)
app.use('/myPlayers', middleware.isAuthenticated, myPlayersRoutes);

// addPlayers route (with authentication middleware)
app.use('/addPlayers', middleware.isAuthenticated, addPlayersRoutes);

// Login route
app.get('/login', (req, res) => {
    res.render('login', { messages: req.flash('error') });
});

// Login route - POST request
app.post('/login', passport.authenticate('local', {
    successRedirect: '/', // Redirect to the home page upon successful login
    failureRedirect: '/login', // Redirect back to the login page if there is an error
    failureFlash: true, // Enable flash messages for errors
}));

// Signup route
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const { email, password, username } = req.body;
    console.log('Received signup request:', email, password, username);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, username });
        await newUser.save();
        console.log('User saved successfully:', newUser);
        res.redirect('/login');
    } catch (error) {
        console.error('Error in signup:', error);
        // Check for duplicate key error (E11000)
        if (error.code === 11000) {
            req.flash('error', 'Email or username already in use. Please choose different credentials.');
            res.redirect('/signup');
        } else {
            res.redirect('/signup');
        }
    }
});
// Logout route
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

// ---- Start Server ----
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server running like Usain Bolt!');
});

