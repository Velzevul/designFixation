var active = false

chrome.browserAction.onClicked.addListener(tab => {
  if (active) {
    chrome.tabs.executeScript(null, {file: './removeMountPoint.js'})
    active = false
  } else {
    chrome.tabs.executeScript(null, {file: './createMountPoint.js'})
    chrome.tabs.executeScript(null, {file: './app/index.js'})
    active = true
  }
})
