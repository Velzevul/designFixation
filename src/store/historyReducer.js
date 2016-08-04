import {REQUEST_FETCH_HISTORY, CONFIRM_FETCH_HISTORY, REJECT_FETCH_HISTORY} from './historyActions'
import initialState from './initialState'

const history = (
  state = initialState.history,
  action
) => {
  switch (action.type) {
    case REQUEST_FETCH_HISTORY:
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      })
    case CONFIRM_FETCH_HISTORY:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items
      })
    case REJECT_FETCH_HISTORY:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}

export default history
