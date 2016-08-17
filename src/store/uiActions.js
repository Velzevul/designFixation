export const TOGGLE_HIGHLIGHT_QUERY = 'TOGGLE_HIGHLIGHT_QUERY'
export const TOGGLE_FOCUS_QUERY = 'TOGGLE_FOCUS_QUERY'

export const toggleHighlightQuery = (query) => {
  return {
    type: TOGGLE_HIGHLIGHT_QUERY,
    query
  }
}

export const toggleFocusQuery = (query) => {
  return {
    type: TOGGLE_FOCUS_QUERY,
    query
  }
}
