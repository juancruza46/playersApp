const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const middleware = require('./utils/middleware');
const homeRoutes = require('./routes/homeRoutes');
const allPlayersRoutes = require('./routes/allPlayersRoutes');
const myPlayersRoutes = require('./routes/myPlayersRoutes');
const addPlayersRoutes = require('./routes/addPlayersRoutes');

const app = express();
app.use(cors());
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'your_secret_key',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

middleware(app);

// Connect to MongoDB
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
app.use('/myPlayers', myPlayersRoutes);
app.use('/addPlayers', addPlayersRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server running like Usain Bolt!');
});
