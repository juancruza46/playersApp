//----Declare dependencies----
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
require('dotenv').config();
const path = require('path');
const middleware = require('./utils/middleware');
const User = require('./models/user');

//----Routes ----
const homeRoutes = require('./routes/homeRoutes');
const allPlayersRoutes = require('./routes/allPlayersRoutes');
const myPlayersRoutes = require('./routes/myPlayersRoutes');
const addPlayersRoutes = require('./routes/addPlayersRoutes');

//----Create Object ----
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

//---- Connect to MongoDB ----
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection
    .on('open', () => console.log('Connected to MongoDB'))
    .on('close', () => console.log('Disconnected from MongoDB'))
    .on('error', (err) => console.log('MongoDB connection error:\n', err));

// Use routes
app.use('/', homeRoutes);
app.use('/allPlayers', allPlayersRoutes);
app.use('/myPlayers', middleware.isAuthenticated, myPlayersRoutes); // Adding authentication middleware
app.use('/addPlayers', middleware.isAuthenticated, addPlayersRoutes); // Adding authentication middleware

// Include signup/login form in the navbar
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/login', (req, res) => {
    res.render('login');
});

app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    })
);

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.redirect('/signup');
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//---- Start Server ----
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server running like Usain Bolt!');
});
