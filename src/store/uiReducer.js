import {TOGGLE_HIGHLIGHT_QUERY, TOGGLE_FOCUS_QUERY} from './uiActions'
import initialState from './initialState'

const ui = (
  state = initialState.ui,
  action
) => {
  switch (action.type) {
    case TOGGLE_HIGHLIGHT_QUERY:
      return Object.assign({}, state, {
        highlightedQuery: action.query === state.highlightedQuery ? null : action.query
      })
    case TOGGLE_FOCUS_QUERY:
      const targetQueryIndex = state.focusedQueries.indexOf(action.query)
      let focusedQueries = []
      if (targetQueryIndex === -1) {
        focusedQueries = [
          ...state.focusedQueries,
          action.query
        ]
      } else {
        focusedQueries = [
          ...state.focusedQueries.slice(0, targetQueryIndex),
          ...state.focusedQueries.slice(targetQueryIndex + 1)
        ]
      }
      return Object.assign({}, state, {
        focusedQueries: focusedQueries
      })
    default:
      return state
  }
}

export default ui
