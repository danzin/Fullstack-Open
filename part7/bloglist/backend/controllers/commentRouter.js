const commentRouter = require('express').Router()

const Comment = require('../models/comment')
const { blogExtractor } = require('../utils/middleware')

commentRouter.get('/comments', async (req, res) => {
  const comments = await Comment.find({}).populate('blog', {
    author: 1,
    title: 1,
    likes: 1,
    url: 1,
  })
  res.json(comments)
})

commentRouter.post('/:id/comment', blogExtractor, async (req, res) => {
  const { content } = req.body
  const { blog } = req
  console.log(blog)
  const comment = new Comment({
    content,
    blog: blog.id,
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(comment.id)
  await blog.save()
  res.status(201).send(savedComment)
})

module.exports = commentRouter
