const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const fruitSchema = new Schema({
  name: {type: String, required: true},
  price: {type: String, required: true},
  isOrganic: {type: Boolean, required: true},
  isFresh: {type: Boolean, required: true}
})

module.exports = mongoose.model('Fruit', fruitSchema)