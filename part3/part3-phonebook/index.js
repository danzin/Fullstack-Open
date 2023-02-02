const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :req-body'))

morgan.token('req-body', (req,res)=>{
 return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  },
  {
    "id": 5,
    "name": "test", 
    "number": "test"
  }
]

app.get('/api/persons', (req,res)=>{
console.log(persons)
res.json(persons)
})

app.get('/api/info', (req,res)=>{
  let date = new Date()
  const infostat = 
  `<div>Phonebook has info for ${persons.length} people</div>
  <br />
  ${date}
  `
  res.send(infostat)
})

app.get('/api/persons/:id', (req,res)=>{
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  person ? res.send(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req,res)=>{
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req,res)=>{
  if(req.body.name && req.body.number){
      const newId = () => Math.floor(Math.random() * 10000)
      const person = req.body
      person.id = newId();
      persons = persons.concat(person)
      res.json(person)
  }else{
    res.status(404).json({error: `Name and number can't be empty`})
  }
})

app.put('/api/persons/:id', (req, res)=>{
  const id = Number(req.params.id)
  const personIndex = persons.findIndex((person) => person.id === id)
  //person.id = Number(req.params.id)
  if (personIndex === -1) {
    res.status(404).send(`Person with ID '${id}' not found`);
    return;
  }
  const updatedPerson = { ...req.body, id };
  persons[personIndex] = updatedPerson;
  res.send(persons[personIndex])

})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on ${PORT}`)