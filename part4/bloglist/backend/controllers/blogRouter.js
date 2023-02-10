const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, user: 1})
  res.json(blogs)
  
})

blogRouter.post('/',userExtractor, async (req, res) => {
  const body = req.body
  //decoding the token provided in the request auth headers
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if(!decodedToken.id){
    return res.status(401).json({error: 'invalid token'})
  }

  console.log("TOKENFROM: " + decodedToken)
  //get user from the userId field in request's body
  const user = req.user

  //token for testroot user
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3Ryb290IiwiaWQiOiI2M2UyYWNiZjhkMjY5ODdiNzQxZThhNGIiLCJpYXQiOjE2NzU3OTk3NjJ9.IONET1mPKGxUPu-kMiQbZCU0bwPeT6H0JahHk9tJW4o
  //token for TestPasswordIs123
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3RQYXNzd29yZElzMTIzNDU2IiwiaWQiOiI2M2UyYzY4NDQwODJlNzJhYjI3ZmRlMDciLCJpYXQiOjE2NzU4MDYzNjJ9.jO3caKybgEJUX63Q5f0ZXq_xE2ZH5535ZNrpMmuDA4U

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id

  })

  //save resolved promise from blog.save() to savedBlog
  const savedBlog = await blog.save()
  //update user's blogs field adding the id of the new blog
  user.blogs = user.blogs.concat(savedBlog.id)
  //save the updated user to database
  await user.save()
  //return response with status 201 CREATED and the new blog
  res.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor,async(request, response) =>{
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({error: 'invalid token'})
  }
  
  const blog = await Blog.findById(request.params.id)
 // const user = await User.findById(decodedToken.id)
  if (!blog || blog.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'Unauthorized' });
  }
  await Blog.deleteOne({ _id: request.params.id });
  return response.status(204).end(); 

})

blogRouter.put('/:id', async(req,res) => {
  const { likes } = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {likes},
    {new: true}
  )
res.status(200).json(updatedBlog)

})

module.exports = blogRouter