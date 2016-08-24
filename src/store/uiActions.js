export const TOGGLE_HIGHLIGHT_QUERY = 'TOGGLE_HIGHLIGHT_QUERY'
export const TOGGLE_FOCUS_QUERY = 'TOGGLE_FOCUS_QUERY'
export const TOGGLE_FOCUS_KEYWORD = 'TOGGLE_FOCUS_KEYWORD'
export const CLEAR_FOCUSED_QUERIES = 'CLEAR_FOCUSED_QUERIES'
export const CLEAR_FOCUSED_KEYWORDS = 'CLEAR_FOCUSED_KEYWORDS'
export const FOCUS_EXAMPLE = 'FOCUS_EXAMPLE'
export const BLUR_EXAMPLE = 'BLUR_EXAMPLE'

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

export const toggleFocusKeyword = (keyword) => {
  return {
    type: TOGGLE_FOCUS_KEYWORD,
    keyword
  }
}

export const clearFocusedQueries = () => {
  return {
    type: CLEAR_FOCUSED_QUERIES
  }
}

export const clearFocusedKeywords = () => {
  return {
    type: CLEAR_FOCUSED_KEYWORDS
  }
}

export const focusExample = (id) => {
  return {
    type: FOCUS_EXAMPLE,
    id
  }
}

export const blurExample = () => {
  return {
    type: BLUR_EXAMPLE
  }
}
