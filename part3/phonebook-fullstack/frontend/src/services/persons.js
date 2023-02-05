import axios from 'axios'
const baseUrl = '/api/persons'

const create = async newPerson => {
  const request = axios.post(baseUrl, newPerson)
  const response = await request
  return response.data
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return (response.data)
}

const update = async (id, personObj) => {
  const request = axios.put(`${baseUrl}/${id}`, personObj)
  const response = await request
  return response.data
}


const remove = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

export default {create, getAll, remove, update}