const mongoose = require('mongoose');

// Define Player Schema
const playerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
    },
    nationality: {
      type: String,
    },
    shirtNumber: {
      type: Number,
    },
  });
  
  // Define Player Model
  const Player = mongoose.model('Player', playerSchema);
  
  module.exports = Player;