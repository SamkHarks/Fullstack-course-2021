const reducer = (state='Welcome to anecdote app', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return null
    default: return state
  }
}

const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', notification: message })
    setTimeout(()=> {dispatch({ type: 'REMOVE_NOTIFICATION'})}, seconds*1000)
  }
}

export { setNotification }
export default reducer