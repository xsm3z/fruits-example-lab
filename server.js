require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const logger = require('morgan')
const Fruit = require('./models/fruit')
const MONGO_URI = process.env.MONGO_URI
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('tiny'))
app.use(methodOverride('_method'))
app.use('/assets', express.static('public'))

mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('MongoDB is showing love')
})

mongoose.connection.on('error', () => {
    console.error('You know how MongoDB be trippin')
})

app.listen(PORT, () => {
  console.log('We in the building' + ` application excepting requests on PORT ${PORT}`)
})
