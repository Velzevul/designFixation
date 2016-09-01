let prevLocation = {}

const searcnRegexp = /^\/search\/pins\/$/
const searchQueryRegexp = /q=([^&]*)/
const categoriesRegexp = /^\/categories\/([^\/]*)\/$/
const topicsRegexp = /^\/topics\/([^\/]*)\/$/
const pinRegexp = /^\/pin\/([^\/]*)\/$/
const boardRegexp = /^\/([^\/]*)\/([^\/]*)\/$/

setInterval(() => {
  if (window.location.href !== prevLocation.href) {
    if (searcnRegexp.test(window.location.pathname)) {
      const query = window.decodeURIComponent(searchQueryRegexp.exec(window.location.search)[1])

      chrome.runtime.sendMessage({
        type: 'url',
        query: `search "${query}"`,
        url: window.location.href
      })
    } else if (categoriesRegexp.test(window.location.pathname)) {
      const category = categoriesRegexp.exec(window.location.pathname)[1]

      chrome.runtime.sendMessage({
        type: 'url',
        query: `category "${category}"`,
        url: window.location.href
      })
    } else if (topicsRegexp.test(window.location.pathname)) {
      const topic = topicsRegexp.exec(window.location.pathname)[1]

      chrome.runtime.sendMessage({
        type: 'url',
        query: `topic "${topic}"`,
        url: window.location.href
      })
    } else if (pinRegexp.test(window.location.pathname)) {
      //
    } else if (boardRegexp.test(window.location.pathname)) {
      const matches = boardRegexp.exec(window.location.pathname)
      const boardName = matches[2]

      chrome.runtime.sendMessage({
        type: 'url',
        query: `board "${boardName}"`,
        url: window.location.href
      })
    }
  }

  prevLocation = Object.assign({}, window.location)
}, 100)
