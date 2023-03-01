/* eslint-disable no-unused-vars */
import { useRef } from 'react'
import { useQuery } from 'react-query'
import { getAll } from '../services/blogs'
import { Link } from 'react-router-dom'
import { useLogin } from '../context/LoginContext'
import { ListGroup, Spinner } from 'react-bootstrap'
const Blogs = () => {
  // const [user, setUser] = useState(null)
  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     blogService.setToken(user.token)
  //   }
  // }, [])
  const { user } = useLogin()

  const { data, isLoading, error } = useQuery('blogs', getAll)
  const blogs = data

  const blogRef = useRef()

  const blogsDisplay = () => (
    <div>
      {blogs &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id} className="blog border border-1 container-md">
              <ListGroup>
                <ListGroup.Item>
                  <Link className="link" to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          ))}
    </div>
  )
  if (isLoading) {
    return (
      <div style={{ position: 'relative', height: '100vh' }}>
        <Spinner
          animation="border"
          role="status"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }
  if (error) {
    return <p>An error occurred: {error.message}</p>
  }

  return <div className="container-md">{blogsDisplay()}</div>
}
export default Blogs
