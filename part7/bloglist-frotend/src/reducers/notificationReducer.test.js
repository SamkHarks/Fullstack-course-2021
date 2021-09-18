import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'


describe('notification reducer', () => {
  const initialState = 'testing notification'

  test('can set new notification', () => {
    const state = initialState
    const action = {
      type: 'SET_MESSAGE',
      message: 'New notification'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toEqual('New notification')
  })

  test('removing notification succeeds', () => {
    const state = initialState
    const action = {
      type: 'REMOVE_MESSAGE'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toEqual(null)
  })
})