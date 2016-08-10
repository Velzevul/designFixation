import {RECEIVE_HISTORIES} from './historiesActions'
import initialState from './initialState'

const histories = (
  state = initialState.histories,
  action
) => {
  switch (action.type) {
    case RECEIVE_HISTORIES:
      return Object.assign({}, state, {
        items: action.items
      })
    default:
      return state
  }
}

export default histories
