/* eslint-disable global-require */
const express = require('express')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
// eliminating the need for try-catch blocks:
require('express-async-errors')

const blogRouter = require('./controllers/blogRouter')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')
const commentRouter = require('./controllers/commentRouter')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB', config.MONGODB_URI)
  })
  .catch((error) => {
    console.log('Error connecting to database: ', error.message)
  })

/** Middlware for app */
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

/** Routing */
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', commentRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testRouter')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
