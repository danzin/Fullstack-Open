import { useRef } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../context/LoginContext'
import AddBlog from './AddBlog'
import Notification from './Notification'
import Togglable from './Togglable'
const Header = () => {
  const { user, logout } = useLogin()
  const navigate = useNavigate()

  const handleLogout = (e) => {
    logout()
    navigate('/login')
  }
  const blogRef = useRef()
  return (
    <div>
      <h2>blogs</h2>
      {user.name && (
        <div>
          <div>{user.name} logged in</div>
          <div className="btn-group" role="group">
            <Button
              className="btn"
              variant="light"
              style={{ height: '2rem' }}
              size="sm"
              onClick={handleLogout}
            >
              logout
            </Button>
            <Togglable className="btn" buttonLabel="newblog" ref={blogRef}>
              {/* down below we pass the addBlog function as props under the name
               * 'createBlog' towards the AddBlog component. Inside, we invoke the function with
               * the author title and url of the new blog object.
               */}
              <AddBlog user={user} />
            </Togglable>
          </div>
        </div>
      )}

      <Notification />
    </div>
  )
}

export default Header
