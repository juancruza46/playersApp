//Import Dependencies
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()
const methodOverride = require('method-override')