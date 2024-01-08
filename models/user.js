//----Declare mongoose ----
const mongoose = require('mongoose');

//email & password schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);
//----export module ----
module.exports = User;
