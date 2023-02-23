import axios from 'axios'

const baseUrl = 'http://localhost:3006/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default {
  getAll,
  createNew
}
