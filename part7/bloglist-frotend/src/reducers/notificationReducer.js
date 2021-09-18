const reducer = (state=null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE': return action.message
    case 'REMOVE_MESSAGE': return null
    default: return state
  }
}

let timeoutID
const setMessage = (message, milliseconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE',
      message
    })
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {dispatch(removeMessage())}, milliseconds)
  }

}

const removeMessage = () => {
  return {
    type: 'REMOVE_MESSAGE'
  }
}

export { setMessage }

export default reducer