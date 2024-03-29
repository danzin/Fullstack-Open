import { useState } from 'react'
import { useField } from './hooks'
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useMatch
} from "react-router-dom"


const Menu = () => {
  const padding = {
    paddingRight: 5
  }


  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}
const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>by: {anecdote.author}</div>
      <div>votes: {anecdote.votes}</div>
      <div>url for more info: 
        <a href={anecdote.info}>
          {anecdote.info}
        </a>
      </div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{ anecdote.content }</Link>
        </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // const content = )
  // const author = 
  // const info = 
  const { reset: contentReset, ...content } = useField('content')
  const { reset: authorReset, ...author } = useField('author')
  const { reset: infoReset, ...info } = useField('info')

  const navigate = useNavigate()



  const handleReset = (e) => {
    e.preventDefault()
    contentReset()
    authorReset()
    infoReset()
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
       content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate("/")
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...content}/>
          {/* <input name='content' value={content} onChange={(e) => setContent(e.target.value)} /> */}
        </div>
        <div>
          author
          <input {...author}/>

          {/* <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} /> */}
        </div>
        <div>
          url for more info
          <input {...info}/>

          {/* <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} /> */}
        </div>
        <div><button type="submit">create</button></div>
        <div><button type="reset">reset</button></div>

      </form>
    </div>
  )

}

const Notification = ({notification}) => {

  const style = {
    display: notification.message ? 'block' : 'none',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: notification.type === 'success' ? 'green' : 'red',
    padding: 5,
    margin: 2
  }

  return (
    <div style={style}>
      <div>{notification.message}</div>
    </div>
  )
}

const App = () => {
  const [notification, setNotification] = useState({type: null, message: null})
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(
      {type: 'success',
      message:`${anecdote.content} by ${anecdote.author} addedd successfully`}
    )
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
 
  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
  ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) 
  : null
  return (
    <div>
      <h1>Software anecdotes</h1>
        <div>
          <Menu/>
          {notification && 
           <Notification notification={notification}/>} 
        </div>
      <Routes>
      <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} ></Route>
      <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} ></Route>
      <Route path="/create" element={<CreateNew addNew={addNew} />} ></Route>
      <Route path="/about" element={<About />} ></Route>

      </Routes>


    <div >    
      <Footer />
    </div>
    </div>
  )
}

export default App
