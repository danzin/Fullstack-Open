import { useMutation, useQueryClient } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import blogService, { remove } from '../services/blogs'
import { useLogin } from '../context/LoginContext'
import { useNotification } from '../context/NotificationContext'
import { Button, ListGroup } from 'react-bootstrap'
import { newComment } from '../services/comments'
import { useInput } from '../hooks/formSubmit'
const Blog = ({ blogs }) => {
  const { user } = useLogin()
  const navigate = useNavigate()
  const id = useParams().id
  const blog = blogs.find((a) => a.id === id)
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()
  const removeBlogMutation = useMutation(remove, {
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries('blogs')
    },
  })
  const removeBlog = async (id) => {
    try {
      if (window.confirm('Confirm delete?')) {
        const user = JSON.parse(
          window.localStorage.getItem('loggedNoteappUser'),
        )
        blogService.setToken(user.token)
        const blog = blogs.filter((blog) => blog.id === id)[0]
        removeBlogMutation.mutate(id)
        showNotification('success', `Successfully removed ${blog.title}`)
        navigate('/')
      }
    } catch (exception) {
      showNotification('error', `error removing blog ${exception}`)
      console.log(exception)
    }
  }
  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries('blogs')
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const updateCommentsMutation = useMutation(newComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const likeBlog = async (id) => {
    try {
      const blog = blogs.filter((blog) => blog.id === id)[0]
      const updated = {
        ...blog,
        likes: blog.likes + 1,
      }
      showNotification('success', `liked ${blog.title}`)
      await updateBlogMutation.mutate(updated)
    } catch (exception) {
      // setNotification('error', exception)
      console.log(exception)
    }
  }
  const [name, handleNameChange] = useInput('')

  const postComment = async (id) => {
    const comment = { content: name, id: id }
    await updateCommentsMutation.mutate(comment)

    console.log(comment)
  }
  return (
    <div className=" blog container-md border border-1 rounded-top border-dark">
      <div className=" blogDetails ">
        <div className="blog-author">
          <h4>{blog.title}</h4>
        </div>

        <div className="blog-author">Author: {blog.author}</div>
        <div className="blog-url">url: {blog.url}</div>
        <div className="blog-likes">
          likes: {blog.likes}
          <Button
            variant="outline-primary"
            className="btn  like-btn btn-sm"
            onClick={() => likeBlog(blog.id)}
          >
            like
          </Button>
        </div>
        <div className="blog-user">
          Added by: {blog.username || blog.user.username}
        </div>
        <div>
          {user.username === (blog.username || blog.user.username) && (
            <Button
              variant="outline-secondary"
              className="rem-btn btn-sm"
              onClick={() => removeBlog(blog.id)}
            >
              remove
            </Button>
          )}
        </div>
        <div>
          <h5>comments:</h5>
          <div>
            <input
              type="text"
              placeholder="post a comment"
              value={name}
              onChange={handleNameChange}
            />
            <Button
              variant="outline-success"
              className="comment-btn btn-sm"
              onClick={() => postComment(blog.id)}
            >
              post
            </Button>
          </div>
          {blog.comments.map((comment) => (
            <ListGroup
              variant="flush"
              className="border-bottom"
              key={comment.id}
            >
              commelt: {comment.content}
            </ListGroup>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
