import {
  RECEIVE_DATA,
  RECEIVE_EXAMPLE,
  RECEIVE_QUERY,
  INC_EXAMPLE_COUNTER
} from './dataActions'
import initialState from './initialState'

const data = (
  state = initialState.data,
  action
) => {
  switch (action.type) {
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        queries: action.queries,
        examples: action.examples
      })
    case RECEIVE_EXAMPLE:
      return Object.assign({}, state, {
        examples: [
          ...state.examples,
          action.example
        ]
      })
    case RECEIVE_QUERY:
      return Object.assign({}, state, {
        queries: [
          ...state.queries,
          action.query
        ]
      })
    case INC_EXAMPLE_COUNTER:
      return Object.assign({}, state, {
        queries: state.queries.map(q => {
          if (q.query === action.query) {
            return Object.assign({}, q, {
              examplesCount: q.examplesCount + 1
            })
          } else {
            return q
          }
        })
      })
    default:
      return state
  }
}

export default data
