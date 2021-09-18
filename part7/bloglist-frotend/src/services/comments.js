import axios from 'axios'

const baseUrl = '/api/comments'

const getAllComments = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const commentService = { getAllComments }

export default commentService