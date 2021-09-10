import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdote reducer', () => {
    const initialState = [
        {
          content: 'first anecdote',
          id: 0,
          votes: 0
        },
        {
          content: 'second anecdote',
          id: 1,
          votes: 0
        }
    ]
    test('should return a proper initial state when called with action that is not defined', () => {
        const action = {
          type: 'DO_NOTHING'
        }
        const newState = anecdoteReducer(initialState, action)
        expect(newState).toEqual(initialState)
      })

    test('returns proper new state when action VOTE is called', () => {
        const action = {
            type: 'VOTE',
            data: { 
              id: 1,
              content: 'second anecdote',
              votes: 1 
            }
        }
        const state = initialState
        deepFreeze(state)
        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(state[0])
        expect(newState).toContainEqual({
            content: 'second anecdote',
            id: 1,
            votes: 1
        })
    })

    test('can create new anecdote', () => {
      const action = {
        type: 'NEW_ANECDOTE',
        data: {
          content: 'third anecdote',
          id: 3,
          votes: 0
        }
      }

      const state = []
      deepFreeze(state)
      const newState = anecdoteReducer(state, action)

      expect(newState).toHaveLength(1)
      expect(newState).toContainEqual(action.data)
    })
})