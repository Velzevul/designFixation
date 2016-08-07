let prevLocation = {}
let lastSession = null
let currentSession = {
  furthestScroll: 0,
  seenExamples: [],
  unseenExamples: []
}

// const observerConfig = {
//   childList: true
// }
//
// const observer = new MutationObserver(mutations => {
//   for (let m of mutations) {
//     console.log(m)
//   }
// })

const pinRegexp = /^\/pin\/([^\/]*)\/$/
const searcnRegexp = /^\/search\/pins\/$/
const searchQueryRegexp = /q=([^&]*)/
const categoriesRegexp = /^\/categories\/([^\/]*)\/$/
const topicsRegexp = /^\/topics\/([^\/]*)\/$/
const newsRegexp = /^\/news\/([^\/]*)\/$/
const boardRegexp = /^\/([^\/]*)\/([^\/]*)\/$/

setInterval(() => {
  if (window.location.href !== prevLocation.href) {
    if (pinRegexp.test(window.location.pathname)) {
      const pinId = pinRegexp.exec(window.location.pathname)[1]

      lastSession = Object.assign({}, currentSession)
      currentSession = {
        type: 'image',
        image: {/* TODO: construct image object */},
        furthestScroll: 0,
        seenExamples: [],
        unseenExamples: []
      }

      // processLoadedExamples(document.querySelectorAll('.pinImageWrapper'))

      console.log(`pin ${pinId}`)
      console.log(currentSession)
    } else if (searcnRegexp.test(window.location.pathname)) {
      const searchQuery = window.decodeURIComponent(searchQueryRegexp.exec(window.location.search)[1])

      if (lastSession && lastSession.type === 'keyword' && lastSession.query === searchQuery) {
        currentSession = Object.assign({}, lastSession)

        console.log(`(continue) search for ${searchQuery}`)
      } else {
        currentSession = {
          type: 'keyword',
          query: searchQuery,
          furthestScroll: 0,
          seenExamples: [],
          unseenExamples: []
        }

        console.log(`search for ${searchQuery}`)
        processLoadedExamples(document.querySelectorAll('.pinImageWrapper'))
        updateUnseenExamples()
      }

      lastSession = null
      console.log(currentSession)
    } else if (categoriesRegexp.test(window.location.pathname)) {
      // const category = categoriesRegexp.exec(window.location.pathname)[1]
      // unseenExamples = []
      // seenExamples = []
      // furthestScroll = 0
      //
      // observer.disconnect()
      // console.log(`category ${category}`)
      // processLoadedExamples(document.querySelectorAll('.pinImageWrapper'))
      // updateUnseenExamples()
      // observer.observe(document.querySelector('.GridItems'), observerConfig)
    } else if (topicsRegexp.test(window.location.pathname)) {
      // const topic = topicsRegexp.exec(window.location.pathname)[1]
      // unseenExamples = []
      // seenExamples = []
      // furthestScroll = 0
      //
      // observer.disconnect()
      // console.log(`topic for ${topic}`)
      // processLoadedExamples(document.querySelectorAll('.pinImageWrapper'))
      // updateUnseenExamples()
      // observer.observe(document.querySelector('.GridItems'), observerConfig)
    } else if (newsRegexp.test(window.location.pathname)) {
      // unseenExamples = []
      // seenExamples = []
      // furthestScroll = 0
      //
      // observer.disconnect()
      // console.log('news')
      // processLoadedExamples(document.querySelectorAll('.pinImageWrapper'))
      // updateUnseenExamples()
      // observer.observe(document.querySelector('.GridItems'), observerConfig)
    } else if (boardRegexp.test(window.location.pathname)) {
      // const matches = boardRegexp.exec(window.location.pathname)
      // const username = matches[1]
      // const boardname = matches[2]
      // unseenExamples = []
      // seenExamples = []
      // furthestScroll = 0
      //
      // observer.disconnect()
      // console.log(`board ${boardname} by ${username}`)
      // processLoadedExamples(document.querySelectorAll('.pinImageWrapper'))
      // updateUnseenExamples()
      // observer.observe(document.querySelector('.GridItems'), observerConfig)
    }
  }

  prevLocation = Object.assign({}, window.location)
}, 100)

const handleNewQuery = query => {
  // send query to server
  // for now just logging...
  console.log(query)

  unseenExamples = []
  seenExamples = []
  furthestScroll = 0

  processLoadedExamples(document.querySelectorAll('.pinImageWrapper'))

  const searchResultsWrapper = document.querySelector('.GridItems')
  observer.disconnect()
  observer.observe(searchResultsWrapper, observerConfig)
}

const processLoadedExamples = (exampleElements) => {
  for (let exampleElement of exampleElements) {
    const exampleHrefParts = exampleElement.href.split('/')

    currentSession.unseenExamples.push({
      id: exampleHrefParts[exampleHrefParts.length - 2],
      url: exampleElement.querySelector('img').src,
      boundingClientRect: exampleElement.getBoundingClientRect()
    })
  }
}

const updateUnseenExamples = () => {
  const currentScroll = window.scrollY
  const unseen = []

  if (currentScroll > currentSession.furthestScroll) {
    for (let example of currentSession.unseenExamples) {
      if (window.innerHeight + currentScroll - example.boundingClientRect.bottom > 0) {
        currentSession.seenExamples.push(Object.assign({}, example))
      } else {
        unseen.push(Object.assign({}, example))
      }
    }

    currentSession.unseenExamples = [...unseen]
    // send 'seen' to server

    currentSession.furthestScroll = currentScroll
  }
}

window.addEventListener('scroll', updateUnseenExamples, false)
