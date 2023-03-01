import axios from 'axios'

export const baseUrl = 'http://localhost:3003/api/blogs/'

export const newComment = async (content) => {
  try {
    const { id } = content
    const response = await axios.post(`${baseUrl}/${id}/comment`, content)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
