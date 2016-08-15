import {REQUEST_DATA, RECEIVE_DATA} from './dataActions'
import initialState from './initialState'

const data = (
  state = initialState.data,
  action
) => {
  switch (action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        queries: action.queries,
        examples: action.examples
      })
    default:
      return state
  }
}

export default data
