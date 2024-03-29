/* eslint-disable no-unused-vars */
require('dotenv').config();

const mongoose = require('mongoose')
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI


mongoose.set('strictQuery',false)
mongoose.connect(url)
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator:
         (v) => {
           return /\d{2,3}-\d{5,}/.test(v)
         },
      message: props => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required']
  },

})

const Person = mongoose.model('Person', personSchema)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)