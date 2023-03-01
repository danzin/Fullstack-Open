/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './index.css'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import { useQuery } from 'react-query'
import { getUsers } from './services/users'
import Header from './components/Header'
import User from './components/User'
import Blog from './components/Blog'
import { getAll } from './services/blogs'
import { useLogin } from './context/LoginContext'
import { Nav, Navbar, Spinner } from 'react-bootstrap'
const App = () => {
  const { data, isLoading, error } = useQuery('users', getUsers)
  const { user } = useLogin()
  const blogs = useQuery('blogs', getAll)
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
    return <div>error</div>
  }
  const padding = {
    padding: 5,
  }
  return (
    <div className="container">
      <Router>
        <Nav className="navbar navbar-expand-lg">
          <Navbar.Brand href="/">React-Query Blogs</Navbar.Brand>
          <Nav.Item>
            <Link className="link" style={padding} to="/">
              blogs
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="link" style={padding} to="/users">
              users
            </Link>
          </Nav.Item>
        </Nav>
        <Header />
        <Routes>
          <Route
            path="/"
            element={user.name !== undefined ? <Blogs /> : <LoginForm />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/users" element={<Users users={data} />} />
          <Route
            path="/users/:id"
            element={<User users={data} data={blogs.data} />}
          />
          <Route path="/blogs/:id" element={<Blog blogs={blogs.data} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
