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

// Routes

// Index
app.get('/fruits', async (req, res) => {
  try {
      const fruits = await Fruit.find({})
      res.render('index.ejs', { fruits })
    } catch (error) {
      res.status(400).json({ msg: error.message })
  }
});

// New
app.get('/fruits/new', (req, res) => {
  res.render('new.ejs')
});

// Create
app.post('/fruits', async (req, res) => {
  try {
    const { name, price, isOrganic, isFresh } = req.body
    const newFruit = new Fruit({
      name,
      price,
      isOrganic: isOrganic === 'on', 
      isFresh: isFresh === 'on'       
    });
    await newFruit.save();
    res.redirect('/fruits');
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
})


// Show
app.get('/fruits/:id', async (req, res) => {
  try {
      const fruit = await Fruit.findById(req.params.id)
      res.render('show.ejs', { fruit })
    } catch (error) {
      res.status(400).json({ msg: error.message })
  }
})

// Edit
app.get('/fruits/:id/edit', async (req, res) => {
  try {
      const fruit = await Fruit.findById(req.params.id)
      res.render('edit.ejs', { fruit })
    } catch (error) {
      res.status(400).json({ msg: error.message })
  }
})

// Update
app.put('/fruits/:id', async (req, res) => {
  try {
    const { name, price, isOrganic, isFresh } = req.body
    const updatedFruit = await Fruit.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        isOrganic: isOrganic === 'on',  
        isFresh: isFresh === 'on'      
      },
      { new: true }
    );
    res.redirect(`/fruits/${req.params.id}`)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
})


// Delete
app.delete('/fruits/:id', async (req, res) => {
  try {
      const fruit = await Fruit.findByIdAndDelete(req.params.id)
      res.redirect('/fruits')
    } catch (error) {
      res.status(400).json({ msg: error.message })
  }
})

app.listen(PORT, () => {
  console.log('We in the building' + ` application accepting requests on PORT ${ PORT }`)
})
