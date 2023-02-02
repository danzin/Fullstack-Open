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

let notes = [
  {
    "id": 1,
    "content": "HTML is easy",
    "important": false
  },
  {
    "id": 2,
    "content": "Browser can execute only JavaScript",
    "important": true
  },
  {
    "id": 3,
    "content": "GET and POST are the most important methods of HTTP protocol",
    "important": false
  }
]

app.get('/api/notes', (req,res)=>{
console.log(notes)
res.json(notes)
})

app.get('/api/info', (req,res)=>{
  let date = new Date()
  const infostat = 
  `<div>Notes has info for ${notes.length} people</div>
  <br />
  ${date}
  `
  res.send(infostat)
})

app.get('/api/notes/:id', (req,res)=>{
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  note ? res.send(note) : res.status(404).end()
})

app.delete('/api/notes/:id', (req,res)=>{
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req,res)=>{
  if(req.body){
      const newId = () => Math.floor(Math.random() * 10000)
      const note = req.body
      note.id = newId();
      notes = notes.concat(note)
      res.json(note)
  }else{
    res.status(404).json({error: `Content cant be empty`})
  }
})

app.put('/api/notes/:id', (req, res)=>{
  const id = Number(req.params.id)
  const noteIndex = notes.findIndex((note) => note.id === id)
  //note.id = Number(req.params.id)
  if (noteIndex === -1) {
    res.status(404).send(`note with ID '${id}' not found`);
    return;
  }
  const updatednote = { ...req.body, id };
  notes[noteIndex] = updatednote;
  res.send(notes[noteIndex])

})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
console.log(`Server running on ${PORT}`)