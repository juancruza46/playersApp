//Import Dependencies 
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

//Router
const Router =express.Router()

//-------------------------------------------------------
//Routes + Controllers 
//Sing up page router.get

//Convert to async to adapt to bcrypt
//router.post

//Encrypt user password
//use genSalt to start the ecryption method

//User will now be created return to page 
//-------------------------------------------------------

//GET login 

//Post login
//itterate to find matching user name
//verify password

//Get Logout

//Delete Logout
//router.delete

//Export Router
module.exports = router;