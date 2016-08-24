import randomcolor from 'randomcolor'
// import algoliasearch from 'algoliasearch'
//
// const client = algoliasearch('74S1JNB1ZT', '3de6fdbafc477cf019673bb81043ae0d')
// const index = client.initIndex('DesignFixationStudyTasks')

export const RECEIVE_DATA = 'RECEIVE_DATA'
export const RECEIVE_QUERY_TASK = 'RECEIVE_QUERY_TASK'
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
    console.log(query)
    const color = randomcolor({
      luminosity: 'bright',
      format: 'rgb'
    })

    dispatch({
      type: RECEIVE_QUERY,
      query: Object.assign({}, query, {
        examplesCount: 0,
        color
      })
    })
  }
}

export const receiveData = (queries, examples, task) => {
  return dispatch => {
    const colors = randomcolor({
      count: queries.length,
      luminosity: 'bright',
      format: 'rgb'
    })

    const enhancedQueries = queries.map((q, index) => Object.assign({}, q, {
      examplesCount: examples.filter(e => e.query === q.query).length,
      color: colors[index]
    }))

    // for (let query of queries) {
    //   index.search(query.query, (err, content) => {
    //     if (content.hits.length) {
    //       const matchedTask = content.hits.filter(h => h.taskAlias === task.alias)[0]
    //
    //       dispatch({
    //         type: RECEIVE_QUERY_TASK,
    //         matchedTask: matchedTask._highlightResult.text.value,
    //         query: query.query
    //       })
    //     }
    //   })
    // }

    dispatch({
      type: RECEIVE_DATA,
      queries: enhancedQueries,
      examples,
      task
    })
  }
}
