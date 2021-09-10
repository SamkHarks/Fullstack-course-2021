const generateId = () => Math.floor(Math.random() * 1000000)

const initialState = {
  notification: 'Welcome to anecdote app',
  id: generateId()
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      const id = action.data.id
      return state.id === id ? null : state
    default: return state
  }
}


const setNotification = (message, seconds) => {
  return async (dispatch) => {
    const id = generateId()
    dispatch({ type: 'SET_NOTIFICATION',
      data: {
        notification: message,
        id
      }
    })
    setTimeout(()=> {dispatch({ type: 'REMOVE_NOTIFICATION', data: { id }})}, seconds*1000)
  }
}

export { setNotification }
export default reducer