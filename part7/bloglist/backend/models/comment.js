const mongoose = require('mongoose')

// schema definition
const commentSchema = new mongoose.Schema({
  content: {
    required: true,
    type: String,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
})

/** Function transforms the returned object from database
 *
 * @param {object} returnedObject
 * @return modified returnedObject without __v, and id instead of _id
 * values remain the same
 * excludes passwordHash
 */

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
