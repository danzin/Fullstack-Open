const express = require('express')
const app = express()

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(requestLogger)

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (req, res)=>{
  res.send('<h1>hey</h1>')
})

app.get('/api/notes', (req,res)=>{
  res.json(notes)
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (req, res)=>{
  return !body.content && res.status(400).json({error: 'content missing'})
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }
  notes = notes.concat(note)
  console.log(note)
  res.json(note)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => {return note.id === id})
  note ? res.json(note) : res.status(404).end()
})

app.delete('/api/notes/:id', (req,res)=>{
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on ${PORT}`)