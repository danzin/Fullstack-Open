import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAll, update } from './requests'
import { useNotification } from './components/NotificationContext';



const App = () => {
  const {notificationDispatch} = useNotification()
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  }) 
  const result = useQuery('anecdotes', getAll)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes++})
    console.log('vote')
    notificationDispatch({type: 'SET_NOTIFICATION', payload: { message: `voted for ${anecdote.content}`, type: 'success' }})
    setTimeout(() => {
      notificationDispatch({type: 'CLEAR_NOTIFICATION'})
    }, 5000)
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
