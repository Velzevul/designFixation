import 'whatwg-fetch'
import randomcolor from 'randomcolor'

export const RECEIVE_DATA = 'RECEIVE_DATA'

export const receiveData = (queries, examples) => {
  const colors = randomcolor({
    count: queries.length,
    luminosity: 'bright',
    format: 'rgb'
  })

  const enhancedQueries = queries.map((q, index) => Object.assign({}, q, {
    examplesCount: examples.filter(e => e.query === q.query).length,
    color: colors[index]
  }))

  return {
    type: RECEIVE_DATA,
    queries: enhancedQueries,
    examples
  }
}
