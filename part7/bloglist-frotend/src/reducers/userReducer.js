const reducer = (state=null, action) => {
  switch (action.type) {
    case 'SET_USER': return action.user
    default: return state
  }
}

const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export { setUser }

export default reducer