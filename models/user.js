//Dependency 
const mongoose = require('../utils/connection')
//Mongoose schema 
const { Schema, model } = mongoose
//Schema definition 
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
//Create User model 
const User = model('User', userSchema)
//Export user model 
module.exports = User