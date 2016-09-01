import {
  TOGGLE_FOCUS_EXAMPLE_GROUP,
  HIGHLIGHT_EXAMPLE
} from './uiActions'
import initialState from './initialState'

const ui = (
  state = initialState.ui,
  action
) => {
  switch (action.type) {
    case TOGGLE_FOCUS_EXAMPLE_GROUP:
      if (action.page === state.focusedGroupPage && action.query === state.focusedGroupQuery) {
        return Object.assign({}, state, {
          focusedGroupPage: null,
          focusedGroupQuery: null
        })
      } else {
        return Object.assign({}, state, {
          focusedGroupPage: action.page,
          focusedGroupQuery: action.query
        })
      }
    case HIGHLIGHT_EXAMPLE:
      return Object.assign({}, state, {
        highlightedExampleId: action.id
      })
    default:
      return state
  }
}

export default ui
