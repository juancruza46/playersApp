//Import Dependencies
const express = require('express')
require('dotenv').config()
const path = require('path')
const middleware = require('./utils/middleware')

//Import Routers
const UserRouter = require('./controllers/userControllers')
const PlayerRouter = require('./controllers/playerControllers')

//Create the object
const app = express()

//View engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Middleware
middleware(app)

//Routes
app.get('/', (req, res) => {
    const { username, loggedIn, userId } = req.session
    res.render('home.ejs', {username,loggedIn, userId})
})

app.use('/users', UserRouter)
app.use('/players', PlayerRouter)

app.get('/error', (req, res) => {
    const error = req.query.error || 'Error Found! Please try again later.'
    const { username, loggedIn, userId } = req.session
    res.render('error.ejs', { error, userId, username, loggedIn })
})

//Server Listener
const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log('Server running like Usain Bolt!')
})