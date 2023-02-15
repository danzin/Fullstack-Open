import { useState, useContext } from "react"
import loginService from '../services/login'
import blogService from '../services/blogs'
import { LoginContext } from './LoginContext'
import Notification from './Notification'

const LoginForm = ({ showNotification }) => {
  //using the useContext hook in order to share user and setUser value between App component and LoginForm component
  //through LoginContext.Provider wrapper
  //wrapping LoginForm in the App component
  const { setUser } = useContext(LoginContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ type: '', message:'' })

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('error' , exception.response.data.error)
      console.log(exception)
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setNotification('error' , null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={notification} />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className='login-btn'>login</button>
      </form>
    </div>
  )
}

export default LoginForm


