import anecdoteService from "../services/anecdotes"

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE': return [...state, action.data]
    case 'INIT_ANECDOTES': return action.data
    case 'VOTE': {
      const changedAnecdote = action.data
      return state.map(a => a.id !== changedAnecdote.id ? a : changedAnecdote)
    }
    default: return state
  }
}

const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const data = await anecdoteService.update(updatedAnecdote.id, updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data
    })
  }
}

const createAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
  }
}

const initAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data
    })
  }
}

export { voteAnecdote, createAnecdote, initAnecdotes }
export default reducer
