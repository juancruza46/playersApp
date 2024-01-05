//-----Import Dependencies-----
const express = require('express');
const session = require('express-session');
require('dotenv').config();
const path = require('path');
const middleware = require('./utils/middleware');

//-----Import Routes-----
const homeRoutes = require('./routes/homeRoutes');
const allPlayersRoutes = require('./routes/allPlayersRoutes');
const myPlayersRoutes = require('./routes/myPlayersRoutes');
const searchPlayersRoutes = require('./routes/searchPlayersRoutes');


//-----Create the object-----
const app = express()

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'your_secret_key',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
    })
    );

//----View engine----
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
    
    //Middleware
    middleware(app)
    
    //Routes
    app.use('/', require('./routes/homeRoutes'));
    app.use('/allPlayers', require('./routes/allPlayersRoutes'));
    app.use('/myPlayers', require('./routes/myPlayersRoutes'));
    app.use('/searchPlayers', require('./routes/searchPlayersRoutes'));
    
    //Server Listener
    const PORT = process.env.PORT || 3000;
    
    app.listen(PORT, () =>{
        console.log('Server running like Usain Bolt!')
    })