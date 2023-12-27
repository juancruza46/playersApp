//Impport Dependencies
const express = require('express')
const axios = require('axios')
//const allPLayersURL in .env
//nationalitySearchUrl
//positionSearchUrl
//teamSearchUrl
const Player = require('..models/player')


//Create Router
const router = express.Router()

//-------------------------------------------------------
//Routes & Controllers

//get-all-players from api into an index
//with data rander index page
//create players array 
//error page

//POST get all player info
//Checkbox player + assign boolean value

//Display saved players 
//GET

//UPDATE player check boxes

//router.DELETE
//Removed from favs

//-------------------------------------------------------
//GET players
//API data will show players when searched by NATIONALITY
//Give user player bio when found
//Render on a show page
//Found or display error page

//GET players
//API data will show players when searched by POSITION
//Give user player bio when found
//Found or display error page

//GET players
//API data will show players when searched by TEAM
//Give user player bio when found
//Found or display error page
//Export router
module.exports = router
