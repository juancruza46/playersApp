//Dependencies 
const mongoose = require('../utils/connection')
//Mongoose schema 
const { Schema, model } = mongoose
//Schema defintion 

//Create user model 
const Player = model('Player', playerSchema)
//Export Module 
module.exports = Player