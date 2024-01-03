//Import Dependencies
const express = require('express')
require('dotenv').config()
const path = require('path')
const middleware = require('./utils/middleware')
const session = require('express-session');

//Import Routes
const homeRoutes = require('./routes/homeRoutes');
const allPlayersRoutes = require('./routes/allPlayersRoutes');
const myPlayersRoutes = require('./routes/myPlayersRoutes');
const searchPlayersRoutes = require('./routes/searchPlayersRoutes');

//Create the object
const app = express()
const PORT = process.env.PORT || 3000;

app.use(
    session({
        secret: 'testing',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

//View engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Middleware
middleware(app)

//Routes
app.use('/', require('./routes/homeRoutes'));
app.use('/all-players', require('./routes/allPlayersRoutes'));
app.use('/my-players', require('./routes/myPlayersRoutes'));
app.use('/search-players', require('./routes/searchPlayersRoutes'));

//Server Listener
app.listen(PORT, () =>{
    console.log('Server running like Usain Bolt!')
})