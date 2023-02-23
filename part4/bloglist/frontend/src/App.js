import { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LogInForm'
import loginService from './services/login'
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({type: '', message:''})
  const [newBlog, setNewBlog] = useState({author: '', title: '', url: ''})
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
    setNotification({type: type, message: msg})
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
  }
  const handleLogin = async(e) => {
    e.preventDefault()

    try{
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification('success', `Successfully logged in`)

    }catch(exception){
      showNotification('error', 'Wrong credentials')
      setTimeout(() => {
        setNotification({ message: '', type: '' })
        }, 5000)
    }
    console.log('logging in with ' + username + password)
  }

  const addBlog = async e => {
    e.preventDefault()
    try{
       const blogObj = {...newBlog}
    const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))
    blogService.setToken(user.token)
    console.log(user)
    await blogService.create(blogObj)
    setBlogs(blogs.concat(blogObj))
    setNewBlog({author: '', title: '', url: ''})
    showNotification('success', `${blogObj.title} added`)

  
    }catch(exception){
      
      showNotification('error', `error adding new blog ${exception}`)

      console.log(exception)
    }
   
  }

  const handleLogOut = e => {
    window.localStorage.clear()
    window.location.reload()
  }

  const loginForm = () => (
    <LoginForm handleLogin={handleLogin} 
        setPassword={setPassword} 
        setUsername={setUsername}
        password={password}
        username={username}/>  
  )

  const blogsDisplay = () => (
    <div>
      <p>{user.name} logged in</p>
      <div>
        <button type="submit" onClick={() =>handleLogOut() }>log out</button>
      </div>
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />)}
    </div>  
  )

  const handleAuthorChange = e => {
    setNewBlog({...newBlog, author: e.target.value});
  };

  const handleTitleChange = e => {
    setNewBlog({...newBlog, title: e.target.value});
  };

  const handleUrlChange = e => {
    setNewBlog({...newBlog, url: e.target.value})
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      
      
     


      {!user && loginForm()}
      {user && <AddBlog 
        newBlog={newBlog}
        addBlog={addBlog}
        handleAuthorChange={handleAuthorChange}
        handleTitleChange={handleTitleChange}
        handleUrlChange={handleUrlChange}
       />  }
      {user && blogsDisplay()}

      


    </div>
  )
}

export default App