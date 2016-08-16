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

socket.on('confirm create', (msg) => {
  console.log('confirm create', msg)
})

socket.on('error', (msg) => {
  console.error('error', msg)
})

chrome.runtime.onMessage.addListener(message => {
  if (message.type === 'url') {
    // { type: 'url', query: Str, url: Str }
    currentQuery = findQuery(message.query)

    if (!currentQuery) {
      queries.push(newQuery(message.query, message.url))
      currentQuery = queries[queries.length - 1]

      socket.emit('create query', {
        query: currentQuery.q,
        url: currentQuery.url
      })
    }
  } else if (message.type === 'examples') {
    // { type: 'examples', examples: [] }
    const e = message.examples[0]
    // sometimes this Pinterest resource also returns related topics. First
    // check is aimed to see if resource's response actually contains pins.
    // Second check looks if the current page has already been loaded
    // previously...
    if (e.aggregated_pin_data && currentQuery.examples[e.id] === undefined) {
      for (let example of message.examples) {
        currentQuery.examples[example.id] = currentQuery.nextLoadedPage
      }

      currentQuery.nextLoadedPage += 1
    }
  } else if (message.type === 'closeUpExamples') {
    // { type: 'examples', examples: [] }
    const e = message.examples[0]
    // sometimes this Pinterest resource also returns related topics. First
    // check is aimed to see if resource's response actually contains pins.
    // Second check looks if the current page has already been loaded
    // previously...
    if (e.aggregated_pin_data && currentQuery.examples[e.id] === undefined) {
      for (let example of message.examples) {
        // -1 serves as an indicator of semi-relevance
        currentQuery.examples[example.id] = -1
      }
    }
  } else if (message.type === 'add') {
    // { type: 'add', example: {} }
    socket.emit('create example', {
      query: currentQuery.q,
      relevance: currentQuery.examples[message.example.id] || -1,
      example: message.example
    })
  }
})
