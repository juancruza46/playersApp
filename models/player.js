const mongoose = require('mongoose');

//Schema defintion 
const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String },
    nationality: { type: String },
    shirtNumber: { type: Number },
    isFavorite: { type: Boolean, default: false },
});

//Create user model 
const Player = mongoose.model('Player', playerSchema);
//Export Module 
module.exports = Player;