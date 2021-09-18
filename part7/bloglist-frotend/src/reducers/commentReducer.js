import blogService from '../services/blogs'
import commentService from '../services/comments'
import { setMessage } from './notificationReducer'

const reducer = (state=[], action) => {
  switch (action.type) {
    case 'INIT_COMMENTS': return action.data
    case 'CREATE_COMMENT': return [...state, action.data.comment]
    case 'REMOVE_COMMENTS': {
      const blogId = action.data
      return state.filter(c => c.blog !== blogId)
    }
    default: return state
  }
}

const createComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const returnedComment = await blogService.addComment(id, comment)
      dispatch({
        type: 'CREATE_COMMENT',
        data: {
          comment: returnedComment
        }
      })
    } catch (e) {
      dispatch(setMessage('Failed to add comment',5000))
    }

  }
}

const initComments = () => {
  return async (dispatch) => {
    try {
      const comments = await commentService.getAllComments()
      dispatch({
        type: 'INIT_COMMENTS',
        data: comments
      })
    } catch  (e) {
      setMessage(`err: ${e.message}`, 5000)
    }

  }
}

const removeComments = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE_COMMENTS',
      data: id
    })
  }
}

export { createComment, initComments, removeComments }

export default reducer
