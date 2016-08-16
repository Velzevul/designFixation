// const socket = io('https://localhost.com/')

let queries = []
let currentQuery

const newQuery = (q, url) => {
  return {
    examples: {},
    latestLoadedPage: 1,
    url,
    q
  }
}
const findQuery = (q) => queries.filter(query => query.q === q)[0]

// socket.emit('message', {text: 'hello from background script!'})
// socket.on('message', (msg) => console.log(msg))

chrome.runtime.onMessage.addListener(message => {
  if (message.type === 'url') {
    console.log(message)
    // currentQuery = findQuery(message.query)
    //
    // if (!currentQuery) {
    //   queries.push(newQuery(message.query, message.url))
    //   currentQuery = queries[queries.length - 1]
    //
    //   // socket.emit('query', {
    //   //   query: message.query,
    //   //   url: message.url
    //   // })
    // }
  } else if (message.type === 'examples') {
    console.log(message)
    //
  } else if (message.type === 'add') {
    console.log(message)
    // socket.emit('add', {
    //   query: currentQuery,
    //   exampleId
    // })
  }
})
