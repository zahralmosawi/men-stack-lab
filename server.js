const mongoose = require('mongoose')
const express = require('express')
const app = express()
const quotesRoutes = require('./routes/quotesRoutes')

// const Quote = require('./models/Quotes') //get the schema

//NEW
const conntectToDB = require("./config/db")
const morgan = require("morgan")
const methodOverride = require("method-override")
app.use(methodOverride("_method"));
app.use(morgan("dev"))

const dotenv = require('dotenv').config() //ALWAYS loads the .env variables

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public')) 

conntectToDB()

//ROUTES
app.use('/quotes',quotesRoutes)

const port = process.env.PORT

app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + port)
})