import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = async e => {
    e.preventDefault()
    const cnt = e.target.anecdote.value
  
    dispatch(createAnecdote(cnt))


    dispatch(setNotif(`You added ${cnt}`, 5))
    e.target.anecdote.value = ''

  }

  return (
  <div>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
  </div>
  )


}

export default AnecdoteForm