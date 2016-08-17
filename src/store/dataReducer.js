import {RECEIVE_DATA} from './dataActions'
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
    default:
      return state
  }
}

export default data
