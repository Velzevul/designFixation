let prevLocation = {}
let examplesSeen = {}
let lastScrollPosition = 0
const scrolltheshold = 50

const pinRegexp = /^\/pin\/([^\/]*)\/$/
const searcnRegexp = /^\/search\/pins\/$/
const searchQueryRegexp = /q=([^&]*)/
const categoriesRegexp = /^\/categories\/([^\/]*)\/$/
const topicsRegexp = /^\/topics\/([^\/]*)\/$/
const newsRegexp = /^\/news\/([^\/]*)\/$/
const boardRegexp = /^\/([^\/]*)\/([^\/]*)\/$/

setInterval(() => {
  if (window.location.href !== prevLocation.href) {
    examplesSeen = {}

    if (pinRegexp.test(window.location.pathname)) {
      const pinId = pinRegexp.exec(window.location.pathname)[1]
      // send new history to server
      console.log(`pin ${pinId}`)
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
    } else if (searcnRegexp.test(window.location.pathname)) {
      const searchQuery = window.decodeURIComponent(searchQueryRegexp.exec(window.location.search)[1])
      console.log(`search for ${searchQuery}`)
      // send new history to server
    } else if (categoriesRegexp.test(window.location.pathname)) {
      const category = categoriesRegexp.exec(window.location.pathname)[1]
      console.log(`category ${category}`)
      // send new history to server
    } else if (topicsRegexp.test(window.location.pathname)) {
      const topic = topicsRegexp.exec(window.location.pathname)[1]
      console.log(`topic for ${topic}`)
      // send new history to server
    } else if (newsRegexp.test(window.location.pathname)) {
      console.log('news')
      // send new history to server
    } else if (boardRegexp.test(window.location.pathname)) {
      const matches = boardRegexp.exec(window.location.pathname)
      const username = matches[1]
      const boardname = matches[2]
      console.log(`board ${boardname} by ${username}`)
      // send new history to server
    }
  }

  prevLocation = Object.assign({}, window.location)
}, 100)

const registerExamplesSeen = (exampleElementsAvailable) => {
  console.log(exampleElementsAvailable.length)

  for (let exampleElement of exampleElementsAvailable) {
    const splitHref = exampleElement.href.split('/')
    const exampleId = splitHref[splitHref.length - 2]

    if (examplesSeen[exampleId] === undefined) {
      const example = {
        id: exampleId,
        url: exampleElement.querySelector('img').src,
        boundingClientRect: exampleElement.getBoundingClientRect(),
        node: exampleElement
      }

      if ((example.boundingClientRect.bottom < window.innerHeight) &&
          (example.boundingClientRect.bottom > 0)) {
        examplesSeen[exampleId] = example
      }
    }
  }

  console.log({length: Object.keys(examplesSeen).length, objects: examplesSeen})
}

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY

  if (Math.abs(currentScrollPosition - lastScrollPosition) > scrolltheshold) {
    registerExamplesSeen(document.querySelectorAll('.mainContainer .pinImageWrapper'))

    lastScrollPosition = currentScrollPosition
  }
}, false)
