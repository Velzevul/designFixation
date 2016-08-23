const socket = io('https://vdziubak.com/', {path: '/designFixationServer'})

let queries = []
let currentQuery

const newQuery = (q, url) => {
  return {
    examples: {},
    nextLoadedPage: 1,
    url,
    q
  }
}
const findQuery = (q) => queries.filter(query => query.q === q)[0]

let sessionId = null

socket.emit('get study')

socket.on('study', (data) => {
  if (data.current) {
    console.log(`start study ${data.sessionId}`)
    sessionId = data.sessionId
  }
})

socket.on('kill study', () => {
  console.log('end study')
  sessionId = null
})

socket.on('confirm create example', (msg) => {
  console.log('confirm create example', msg)
})

socket.on('confirm create query', (msg) => {
  console.log('confirm create query', msg)
})

socket.on('error', (msg) => {
  console.error('error', msg)
})

chrome.runtime.onMessage.addListener(message => {
  if (sessionId) {
    if (message.type === 'url') {
      // { type: 'url', query: Str, url: Str }
      currentQuery = findQuery(message.query)

      if (!currentQuery) {
        queries.push(newQuery(message.query, message.url))
        currentQuery = queries[queries.length - 1]

        socket.emit('create query', {
          query: currentQuery.q,
          url: currentQuery.url,
          sessionId
        })
      }
    } else if (message.type === 'examples') {
      // { type: 'examples', examples: [] }

      // sometimes this Pinterest resources returns weird responses. 1st and 2nd
      // checks verify that resource's response contains pins.
      // The last check looks if the current page has already been loaded
      // previously...
      if (message.examples instanceof Array) {
        const e = message.examples[0]

        if (e.aggregated_pin_data && currentQuery.examples[e.id] === undefined) {
          for (let example of message.examples) {
            currentQuery.examples[example.id] = currentQuery.nextLoadedPage
          }

          currentQuery.nextLoadedPage += 1
        }
      }
    } else if (message.type === 'closeUpExamples') {
      // { type: 'examples', examples: [] }

      // sometimes this Pinterest resources returns weird responses. 1st and 2nd
      // checks verify that resource's response contains pins.
      // The last check looks if the current page has already been loaded
      // previously...
      if (message.examples instanceof Array) {
        const e = message.examples[0]

        if (e.aggregated_pin_data && currentQuery.examples[e.id] === undefined) {
          for (let example of message.examples) {
            // -1 serves as an indicator of semi-relevance
            currentQuery.examples[example.id] = -1
          }
        }
      }
    } else if (message.type === 'add') {
      // { type: 'add', example: {} }
      socket.emit('create example', {
        query: currentQuery.q,
        relevance: currentQuery.examples[message.example.id] || -1,
        example: message.example,
        sessionId
      })
    }
  }
})
