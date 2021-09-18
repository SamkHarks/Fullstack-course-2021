import blogService from '../services/blogs'
import { setMessage } from './notificationReducer'
import { removeUserBlog, updateUserBlogs } from './usersReducer'

const reducer = (state=[], action) => {
  switch (action.type) {
    case 'NEW_BLOG': return [...state, action.data]
    case 'INIT_BLOGS': return action.data
    case 'LIKE_BLOG': {
      const updatedBlog = action.data
      return state.map(b => b.id !== updatedBlog.id ? b : updatedBlog)
    }
    case 'REMOVE_BLOG': {
      const id = action.data
      return state.filter(b => b.id !== id)
    }
    default: return state
  }
}

const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const addNewBlog= (newBlog) => {
  return {
    type: 'NEW_BLOG',
    data: newBlog
  }
}

const createNewBlog = (newBlog, user) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      returnedBlog.user = { id: returnedBlog.user.id, username: user.username, name: user.name }
      dispatch(addNewBlog(returnedBlog))
      dispatch(setMessage(`Added new blog ${returnedBlog.title} by ${returnedBlog.author}`,5000))
      dispatch(updateUserBlogs(user.username, { ...newBlog, id: returnedBlog.id }))
    } catch (e) {
      dispatch(setMessage('Failed to save blog',5000))
    }
  }
}

const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const changedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      const returnedBlog = await blogService.update(changedBlog.id, changedBlog)
      returnedBlog.user = blog.user
      dispatch({
        type: 'LIKE_BLOG',
        data: returnedBlog
      })
    } catch (e) {
      dispatch(setMessage('Failed to update blog', 5000))
    }
  }
}

const removeBlog = (id, username) => {
  return  async (dispatch) => {
    try {
      await blogService.removeById(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: id
      })
      dispatch(removeUserBlog(id, username))
    } catch (e) {
      dispatch(setMessage('Failed to remove blog', 5000))
    }
  }
}

export { initBlogs, createNewBlog, likeBlog, removeBlog  }

export default reducer