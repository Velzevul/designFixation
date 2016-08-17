import 'whatwg-fetch'
import randomcolor from 'randomcolor'
import algoliasearch from 'algoliasearch'

const client = algoliasearch('74S1JNB1ZT', '3de6fdbafc477cf019673bb81043ae0d')
const index = client.initIndex('DesignFixationStudyTasks')

export const RECEIVE_DATA = 'RECEIVE_DATA'
export const RECEIVE_QUERY_TASK = 'RECEIVE_QUERY_TASK'

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

    for (let query of queries) {
      index.search(query.query, (err, content) => {
        if (content.hits.length) {
          const matchedTask = content.hits.filter(h => h.taskAlias === task.alias)[0]

          dispatch({
            type: RECEIVE_QUERY_TASK,
            matchedTask: matchedTask._highlightResult.text.value,
            query: query.query
          })
        }
      })
    }

    dispatch({
      type: RECEIVE_DATA,
      queries: enhancedQueries,
      examples,
      task
    })
  }
}
