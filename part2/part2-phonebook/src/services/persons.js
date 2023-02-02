import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => (response.data))
}

//finish the update function
const update = (id, personObj) => {
  const request = axios.put(`${baseUrl}/${id}`, personObj)
  return request.then(response => response.data)
}


const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default {create, getAll, remove, update}