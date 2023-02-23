import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notificationReducer';

const Anecdote = ({anecdote, vote}) => {
return (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={vote}>vote</button>
    </div>
  </div>
)}

const AnecdoteList = () => {
 
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase()
          .includes(filter.toLowerCase())
      )
      .sort((a, b) => 
        b.votes - a.votes
      )
  );
  const vote = anecdote => {

    dispatch(updateAnecdote(anecdote))
    dispatch(setNotif(`You voted for ${anecdote.content}`, 5))
  }
  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id} 
          anecdote={anecdote} 
          vote ={() => vote(anecdote)}/>
      )}
    </div>
  )

}
export default AnecdoteList