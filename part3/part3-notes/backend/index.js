const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Note = require('./models/note')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name ==='ValidationError'){
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


require('dotenv').config()
app.use(express.json())

app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :req-body'))

morgan.token('req-body', (req,res)=>{
 return req.method === 'POST' ? JSON.stringify(req.body) : ''
})


app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/info', (req, res, next) => {
  let date = new Date();
  Note.countDocuments({})
    .then(count => {
      const infostat = 
        `<div>Phonebook has info for ${count} people</div>
        <br />
        ${date}
        `;
      res.send(infostat);
    })
    .catch(error => next(error))
});

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/notes', (req,res, next)=>{
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save()
    .then(savedNote => {
     res.json(savedNote)
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next)=>{

  const {content, important} = req.body

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    {new: true, runValidators: true, context: 'query'}
  )
  .then(updatedNote => {
    res.json(updatedNote)
  })
  .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
console.log(`Server running on ${PORT}`)