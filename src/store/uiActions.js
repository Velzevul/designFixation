export const TOGGLE_FOCUS_EXAMPLE_GROUP = 'TOGGLE_FOCUS_EXAMPLE_GROUP'
export const HIGHLIGHT_EXAMPLE = 'HIGHLIGHT_EXAMPLE'

export const highlightExample = (id) => {
  return {
    type: HIGHLIGHT_EXAMPLE,
    id
  }
}

export const toggleFocusExampleGroup = (query, page) => {
  return {
    type: TOGGLE_FOCUS_EXAMPLE_GROUP,
    query,
    page
  }
}
