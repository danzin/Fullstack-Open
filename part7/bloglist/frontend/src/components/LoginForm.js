// import loginService from '../services/login'
// import blogService from '../services/blogs'
import { useLogin } from '../context/LoginContext'
import Notification from './Notification'
import { useField } from '../hooks/formSubmit'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
const LoginForm = ({ showNotification }) => {
  //using the useContext hook in order to share user and setUser value between App component and LoginForm component
  //through LoginContext.Provider wrapper
  //wrapping LoginForm in the App component
  const { loginUsr } = useLogin()
  //const { setUser } = useContext(LoginContext)
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  //const [notification, setNotification] = useState({ type: '', message: '' })
  const username = useField('text')
  const password = useField('password')
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      var usrObj = { username: username.value, password: password.value }
      console.log(usrObj)
      loginUsr(usrObj)
      navigate('/')

      // const user = await loginService.login({
      //   username,
      //   password,
      // })
      // window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      // blogService.setToken(user.token)

      // setUser(user)
      // setUsername('')
      // setPassword('')
    } catch (exception) {
      showNotification('error', exception.response.data.error)
      console.log(exception)
      // setUsername('')
      // setPassword('')
    }
  }

  return (
    <div>
      <Notification />
      <h2>Login</h2>
      <Form onSubmit={handleLogin} className="formLogin">
        <Form.Group>
          <Form.Control
            placeholder="username"
            type="text"
            name="username"
            id="username"
            value={username.username}
            onChange={username.onChange}
          />
          {/* <div>
            username
            <input
              id="username"
              name="name"
              type="text"
              value={username.username}
              onChange={username.onChange}
            />
          </div> */}
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            id="password"
            value={password.value}
            onChange={password.onChange}
          />

          {/* <div>
            password
            <input
              id="password"
              type="password"
              value={password.value}
              onChange={password.onChange}
            />
          </div> */}
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
