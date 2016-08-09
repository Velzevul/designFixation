let prevLocation = {}
let examplesSeen = {}
let lastScrollPosition = 0
const scrolltheshold = 50

const pinRegexp = /^\/pin\/([^\/]*)\/$/
const searcnRegexp = /^\/search\/pins\/$/
const searchQueryRegexp = /q=([^&]*)/
const categoriesRegexp = /^\/categories\/([^\/]*)\/$/
const topicsRegexp = /^\/topics\/([^\/]*)\/$/
const boardRegexp = /^\/([^\/]*)\/([^\/]*)\/$/

const registerExamplesSeen = (exampleElementsAvailable) => {
  console.log(exampleElementsAvailable.length)

  let payload = {
    examples: []
  }

  for (let exampleElement of exampleElementsAvailable) {
    const splitHref = exampleElement.href.split('/')
    const exampleId = splitHref[splitHref.length - 2]
    const exampleDim = exampleElement.getBoundingClientRect()

    if (examplesSeen[exampleId] === undefined) {
      const example = {
        id: exampleId,
        url: exampleElement.querySelector('img').src,
        aspectRatio: exampleDim.width / exampleDim.height,
        node: exampleElement // for debugging purposes
      }

      if ((exampleDim.bottom < window.innerHeight) &&
          (exampleDim.bottom > 0)) {
        payload.examples.push(example)
        examplesSeen[exampleId] = example
      }
    }
  }

  if (payload.examples.length > 0) {
    chrome.runtime.sendMessage({
      type: 'examples',
      payload
    })
  }

  console.log({length: Object.keys(examplesSeen).length, objects: examplesSeen})
}

const scrollListener = () => {
  const currentScrollPosition = window.scrollY

  if (Math.abs(currentScrollPosition - lastScrollPosition) > scrolltheshold) {
    registerExamplesSeen(document.querySelectorAll('.mainContainer .pinImageWrapper'))

    lastScrollPosition = currentScrollPosition
  }
}

setInterval(() => {
  if (window.location.href !== prevLocation.href) {
    examplesSeen = {}
    window.removeEventListener('scroll', scrollListener, false)

    if (pinRegexp.test(window.location.pathname)) {
      const pinId = pinRegexp.exec(window.location.pathname)[1]
      const closeUp = document.querySelector('.Closeup')

      if (closeUp) {
        closeUp.addEventListener('scroll', () => {
          const currentScrollPosition = closeUp.scrollTop

          if (Math.abs(currentScrollPosition - lastScrollPosition) > scrolltheshold) {
            registerExamplesSeen(document.querySelectorAll('.closeupBottom .pinImageWrapper'))
            lastScrollPosition = currentScrollPosition
          }
        }, false)
      }

      const payload = {
        history: {
          type: 'related',
          examples: [],
          pinUrl: document.querySelector('.pinImage') ? document.querySelector('.pinImage').src : document.querySelector('.transitionImage .pinImg').src,
          pinId
        }
      }

      chrome.runtime.sendMessage({
        type: 'history',
        payload
      })
    } else if (searcnRegexp.test(window.location.pathname)) {
      const searchQuery = window.decodeURIComponent(searchQueryRegexp.exec(window.location.search)[1])
      const payload = {
        history: {
          type: 'search',
          query: searchQuery,
          image: null,
          examples: []
        }
      }

      chrome.runtime.sendMessage({
        type: 'history',
        payload
      })

      window.addEventListener('scroll', scrollListener, false)
    } else if (categoriesRegexp.test(window.location.pathname)) {
      const category = categoriesRegexp.exec(window.location.pathname)[1]
      console.log(`category ${category}`)
      const payload = {
        history: {
          type: 'category',
          image: null,
          examples: [],
          category
        }
      }

      chrome.runtime.sendMessage({
        type: 'history',
        payload
      })

      window.addEventListener('scroll', scrollListener, false)
    } else if (topicsRegexp.test(window.location.pathname)) {
      const topic = topicsRegexp.exec(window.location.pathname)[1]
      console.log(`topic for ${topic}`)
      const payload = {
        history: {
          type: 'topic',
          image: null,
          examples: [],
          topic
        }
      }

      chrome.runtime.sendMessage({
        type: 'history',
        payload
      })

      window.addEventListener('scroll', scrollListener, false)
    } else if (boardRegexp.test(window.location.pathname)) {
      const matches = boardRegexp.exec(window.location.pathname)
      const boardAuthor = matches[1]
      const boardName = matches[2]
      console.log(`board ${boardName} by ${boardAuthor}`)
      const payload = {
        history: {
          type: 'board',
          image: null,
          examples: [],
          boardAuthor,
          boardName
        }
      }

      chrome.runtime.sendMessage({
        type: 'history',
        payload
      })

      window.addEventListener('scroll', scrollListener, false)
    }
  }

  prevLocation = Object.assign({}, window.location)
}, 100)
