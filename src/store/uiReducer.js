import {
  TOGGLE_HIGHLIGHT_QUERY,
  TOGGLE_FOCUS_QUERY,
  TOGGLE_FOCUS_KEYWORD,
  CLEAR_FOCUSED_QUERIES,
  CLEAR_FOCUSED_KEYWORDS,
  FOCUS_EXAMPLE,
  BLUR_EXAMPLE
} from './uiActions'
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
        focusedQueries
      })
    case TOGGLE_FOCUS_KEYWORD:
      const targetKeywordIndex = state.focusedKeywords.indexOf(action.keyword)
      let focusedKeywords = []
      if (targetKeywordIndex === -1) {
        focusedKeywords = [
          ...state.focusedKeywords,
          action.keyword
        ]
      } else {
        focusedKeywords = [
          ...state.focusedKeywords.slice(0, targetKeywordIndex),
          ...state.focusedKeywords.slice(targetKeywordIndex + 1)
        ]
      }
      return Object.assign({}, state, {
        focusedKeywords
      })
    case CLEAR_FOCUSED_QUERIES:
      return Object.assign({}, state, {
        focusedQueries: initialState.ui.focusedQueries
      })
    case CLEAR_FOCUSED_KEYWORDS:
      return Object.assign({}, state, {
        focusedKeywords: initialState.ui.focusedKeywords
      })
    case FOCUS_EXAMPLE:
      return Object.assign({}, state, {
        focusedExample: action.id
      })
    case BLUR_EXAMPLE:
      return Object.assign({}, state, {
        focusedExample: null
      })
    default:
      return state
  }
}

export default ui
