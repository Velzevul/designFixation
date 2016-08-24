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
    focusedKeywords: [],
    focusedExample: null
  },
  study: {
    participantId: '',
    sessionId: null,
    condition: 'baseline',
    taskAlias: ''
  }
}
