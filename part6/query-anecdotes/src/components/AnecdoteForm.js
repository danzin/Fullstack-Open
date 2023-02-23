import { useMutation, useQueryClient } from 'react-query'
import { createNew } from '../requests'
import { useNotification } from './NotificationContext';

const AnecdoteForm = () => {
  const {notificationDispatch} = useNotification()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createNew, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({type: 'SET_NOTIFICATION', payload: { message: `added: ${newAnecdote.content}`, type: 'success' }})
      setTimeout(() => {
        notificationDispatch({type: 'CLEAR_NOTIFICATION'})
      }, 5000)
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('notes', anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      notificationDispatch({type: 'SET_NOTIFICATION', payload: { message: `${error.response.data.error}`, type: 'error' }})
      setTimeout(() => {
        notificationDispatch({type: 'CLEAR_NOTIFICATION'})
      }, 5000)
      console.log(error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    
    newAnecdoteMutation.mutate(content)
  
    event.target.anecdote.value = ''
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
