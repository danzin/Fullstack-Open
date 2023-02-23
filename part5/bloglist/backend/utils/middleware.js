const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method: ' + request.method)
  logger.info('Path: ' + request.path)
  logger.info('Body: ' + request.body)
  logger.info('---------')
  next()
}


/** tokenExtractor returns request obj 
 * with new property 'token'
 *  
 *  @param {object} request
 *  @param {object} response
 *  @param {function} next
 * 
 *  @return {object} request with new property token
 * containting the auth token sent via 
 * request authorization header. 
 * If no auth header is sent, returns null for token value
 * 
  */
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

/** userExtractor returns request obj with new user property 
 * 
 * @param {object} request 
 * @param {response} response 
 * @param {function} next 
 * @returns  {object} request with new property user
 * containing the verified user sending the request
 */
const userExtractor = async (request, response, next) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
    request.user = user;
    next();


}

/**
 * 
 * @param {object} error the error object being handled
 * @param {object} request 
 * @param {object} response 
 * @param {function} next 
 * @returns response with status 400 and corresponding error message for the specific error
 */
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }else if(error.name === 'ValidationError'){
    return response.status(400).send({error: error.message})
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

module.exports = {
  errorHandler,
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
  userExtractor
}