import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => 
  axios.get(baseUrl)
    .then(res => res.data)

export const createNew = content => {
  const object = {votes: 0, content}

  return axios.post(baseUrl, object)
    .then(res => res.data)

  }
export const update = anecdote =>{
const object = {...anecdote, votes: anecdote.votes + 1}
  
return axios.put(`${baseUrl}/${anecdote.id}`, object)
    .then(res => res.data)

}