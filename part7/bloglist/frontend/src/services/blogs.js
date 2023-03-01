import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const create = async (blogObj) => {
  try {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, blogObj, config)
    return response.data
  } catch (err) {
    console.log(err)
    return err
  }
}

export const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = async (blogObj) => {
  console.log('blog coming into services/blog.js/update function: ', blogObj)
  const response = await axios.put(`${baseUrl}/${blogObj.id}`, blogObj)
  return response.data
}
export default { setToken, update }
