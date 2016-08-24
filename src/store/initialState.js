export default {
  data: {
    queries: [],
    examples: [],
    task: {},
    stemDictionary: {}
  },
  ui: {
    highlightedQuery: null,
    focusedQueries: [],
    focusedKeywords: []
  },
  study: {
    participantId: '',
    sessionId: null,
    condition: 'baseline',
    taskAlias: ''
  }
}
