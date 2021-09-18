import userService from '../services/users'

const reducer = (state=[], action) => {
  switch (action.type) {
    case 'NEW_USER_BLOG': {
      const username = action.data.username
      const blog = action.data.blog
      return state.map(u => u.username !== username ? u : { ...u, blogs: u.blogs.concat(blog) })
    }
    case 'INIT_USERS': return action.data
    case 'REMOVE_USER_BLOG': {
      const username = action.data.username
      const id = action.data.id
      return state.map(u => u.username !== username ? u : { ...u, blogs: u.blogs.filter(b => b.id !== id) })
    }
    default: return state
  }
}

const updateUserBlogs = (username, blog) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEW_USER_BLOG',
      data: {
        username,
        blog
      }
    })
  }
}

const initUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

const removeUserBlog = (id, username) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE_USER_BLOG',
      data: { id, username }
    })
  }
}

export { updateUserBlogs, initUsers, removeUserBlog }

export default reducer