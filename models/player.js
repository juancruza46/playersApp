const mongoose = require('mongoose');

//Schema defintion 
const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    info: { type: String },
});

//Create user model 
const Player = mongoose.model('Player', playerSchema);
//Export Module 
module.exports = Player;