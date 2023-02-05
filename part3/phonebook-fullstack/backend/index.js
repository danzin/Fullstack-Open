const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/Person')
const app = express()
require('dotenv').config()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :req-body'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError'){
    return response.status(400).json({error})
  }

  next(error)
}
morgan.token('req-body', (req,res)=>{
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (req, res, next)=>{
  Person.find({})
    .then(persons => res.json(persons))
    .catch(error => next(error))

})

app.get('/api/info', (req, res, next) => {
  let date = new Date()
  Person.countDocuments({})
    .then(count => {
      const infostat = 
        `<div>Phonebook has info for ${count} people</div>
        <br />
        ${date}
        `
      res.send(infostat)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person){
        res.json(person)
      }else{
        res.status(404).end()
      }


  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next)=>{
  const id = req.params.id
  console.log(id)
  Person.findByIdAndRemove(id)
    .then(result => {
      res.status(204).end()
    }).catch(error => next(error))
    
  res.end()
})


app.post('/api/persons', (req, res, next)=>{
  console.log(req.body)
  const body = req.body
  if (body.name === undefined && body.number === undefined) {
    return res.status(400).json({ error: 'missing person information from input' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next)=>{
  const body = req.body
  
  const person = {
    name: body.name,
    number: body.number
  }

  if(!body.number) return res.status(400).json({error: 'Missing number for person'})
  Person.findByIdAndUpdate(req.params.id, person, {new: true}).then(updatedPerson => {
    res.json(updatedPerson)
  }).catch(error => next(error))
})

const PORT = process.env.PORT || 3001

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT)
console.log(`Server running on ${PORT}`)