import {RECEIVE_DATA, RECEIVE_QUERY_TASK} from './dataActions'
import initialState from './initialState'

const data = (
  state = initialState.data,
  action
) => {
  switch (action.type) {
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        queries: action.queries,
        examples: action.examples,
        task: action.task
      })
    case RECEIVE_QUERY_TASK:
      return Object.assign({}, state, {
        queries: state.queries.map(q => {
          if (q.query === action.query) {
            return Object.assign({}, q, {
              matchedTask: action.matchedTask
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
