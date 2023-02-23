const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/info', (req, res, next) => {
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

notesRouter.get('/:id', (request, response, next) => {
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

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.post('/', (req,res, next)=>{
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

notesRouter.put('/:id', (req, res, next)=>{

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

module.exports = notesRouter