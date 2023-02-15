/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import { LoginContext } from './components/LoginContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ type: '', message:'' })


  useEffect(() => {
    const fetch = async () => {
      const blogs = await blogService.getAll()
      const sorted = blogs.sort((a,b) => b.likes - a.likes)
      setBlogs(sorted)
    }
    fetch()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  const showNotification = (type, msg) => {
    setNotification({ type: type, message: msg })
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 5000)
  }

  const addBlog = async blogObj => {
    try{
      const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))
      blogService.setToken(user.token)

      const newBlog = await blogService.create(blogObj)
      newBlog.username = user.username
      setBlogs(blogs.concat(newBlog))

      showNotification('success', `${newBlog.title} added`)
      blogRef.current.toggleVisibility()
    }catch(exception){
      showNotification('error', `error adding new blog ${exception}`)
      console.log(exception)
    }
  }

  const removeBlog = async id => {
    try{
      if(window.confirm("Confirm delete?")){
        const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))
        blogService.setToken(user.token)
        const blog = blogs.filter(blog => blog.id === id)[0]

        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id ))
        console.log(blog)
        showNotification('success', `Successfully removed ${blog.title}`)
      }
    }catch(exception){
      showNotification('error', `error removing blog ${exception}`)
      console.log(exception)
    }
  }


  const likeBlog = async id => {
    try{
      const blog = blogs.filter(blog => blog.id === id)[0]
      const index = blogs.indexOf(blog)
      blog.likes+=1
      showNotification('success', `liked ${blog.title}`)

      await blogService.update(id, blog)
      const newBlogs = [...blogs]
      newBlogs[index] = blog

      // setBlogs(blogs => newBlogs)
      const sorted = newBlogs.sort((a,b) => b.likes - a.likes)
      setBlogs(sorted)
    }catch(exception){
      setNotification('error', exception)
      console.log(exception)
    }


  }

  const handleLogOut = e => {
    window.localStorage.clear()
    window.location.reload()
  }
  const blogRef = useRef()

  //wrapping LoginForm in LoginContext.Provider, thus ensuring the value for user and setUser
  //set by LoginForm is share within App
  const loginForm = () => {
    return (
      <Togglable buttonLabel='login' >
        <LoginContext.Provider value={{ user, setUser }}>
          <LoginForm showNotification={showNotification}/>
        </LoginContext.Provider>
      </Togglable>
    )
  }

  const blogsDisplay = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={ blog.id } blog={ blog } removeBlog={removeBlog} likeBlog={likeBlog} />)}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>

      <div>
        <div className='cuser'>{user ? `${user.name} logged in`: ''}</div>
        <div className='logout-btn'>
          <button type="submit" className='logout-btn'onClick={() => handleLogOut() }>log out</button>
        </div>
      </div>
      {!user && loginForm()}

      {user &&
      <Togglable buttonLabel="newblog" ref={ blogRef }>
        {/* down below we pass the addBlog function as props under the name
    * 'createBlog' towards the AddBlog component. Inside, we invoke the function with
    * the author title and url of the new blog object.
    */}
        <AddBlog
          user = { user } createBlog = {addBlog}
        />
      </Togglable>
      }
      <Notification notification={notification} />

      {user && blogsDisplay()}




    </div>
  )
}

export default App