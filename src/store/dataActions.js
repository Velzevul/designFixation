export const RECEIVE_DATA = 'RECEIVE_DATA'
export const RECEIVE_EXAMPLE = 'RECEIVE_EXAMPLE'
export const RECEIVE_QUERY = 'RECEIVE_QUERY'
export const INC_EXAMPLE_COUNTER = 'INC_EXAMPLE_COUNTER'

export const receiveExample = (example) => {
  return (dispatch, getState) => {
    console.log(example)
    dispatch({
      type: INC_EXAMPLE_COUNTER,
      query: example.query
    })

    dispatch({
      type: RECEIVE_EXAMPLE,
      example
    })
  }
}

export const receiveQuery = (query) => {
  return dispatch => {
    dispatch({
      type: RECEIVE_QUERY,
      query: Object.assign({}, query, {
        examplesCount: 0
      })
    })
  }
}

export const receiveData = (queries, examples) => {
  return dispatch => {
    const enhancedQueries = queries.map((q, index) => Object.assign({}, q, {
      examplesCount: examples.filter(e => e.query === q.query).length
    }))

    dispatch({
      type: RECEIVE_DATA,
      queries: enhancedQueries,
      examples
    })
  }
}
