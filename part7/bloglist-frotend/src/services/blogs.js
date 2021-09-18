import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id,blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const removeById = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response =  await axios.delete(`${baseUrl}/${id}`, config)
  return response.status
}

const addComment = async (id,comment) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment, config)
  return response.data
}

const getBlogComments = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.get(`${baseUrl}/${id}/comments`, config)
  return request.then(response => response.data)
}

const blogService = {
  getAll,
  create,
  setToken,
  update,
  removeById,
  addComment,
  getBlogComments
}

export default blogService