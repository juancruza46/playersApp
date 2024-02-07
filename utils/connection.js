//Import dependencies ENV + Mongoose
require('dotenv').config()
const mongoose = require('mongoose')

//Database connection
const DATABASE_URL = process.env.DATABASE_URL

const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}

//connect
mongoose.connect(DATABASE_URL, CONFIG)

//log actions 
mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', (err) => console.log('An error occurred: \n', err))

module.exports = mongoose