'use strict'

const XHRInterceptor = function () {
  'use strict'

  var div = document.createElement('div')

  div.id = 'xhrElem'
  div.style.display = 'none'
  document.body.appendChild(div)

  var XHRCall = new Event('XhrCall')

  var XHR = window.XMLHttpRequest.prototype
  var proxiedOpen = XHR.open
  var proxiedSend = XHR.send

  let request = {
    response: null,
    method: null,
    url: null,
    data: null
  }

  const emitCall = function () {
    div.dataset.method = request.method
    div.dataset.url = request.url
    div.dataset.data = request.data
    div.dataset.response = request.response

    div.dispatchEvent(XHRCall)
  }

  XHR.open = function (method, path, async) {
    request.method = method
    request.url = path

    return proxiedOpen.apply(this, arguments)
  }

  XHR.send = function (data) {
    this.addEventListener('readystatechange', function () {
      request.data = data

      if (this.readyState === 4) {
        request.response = this.responseText

        emitCall()
      }
    })

    return proxiedSend.apply(this, arguments)
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  console.log('interceptor reporting')
  const injectedScript = document.createElement('script')
  injectedScript.type = 'text/javascript'
  injectedScript.text = '(' + XHRInterceptor + ')("");'
  document.body.appendChild(injectedScript)

  const xhrElem = document.getElementById('xhrElem')
  xhrElem.addEventListener('XhrCall', () => {
    const xhrType = xhrElem.dataset.url.split('/')[2]
    let xhrResponse = null
    let payload = null

    console.log(xhrType)

    switch (xhrType) {
      case 'BaseSearchResource':
        xhrResponse = JSON.parse(xhrElem.dataset.response)
        chrome.runtime.sendMessage({type: xhrType, url: xhrElem.dataset.url, response: xhrResponse})
        payload = {
          type: 'examples',
          examples: xhrResponse.resource_response.data.results
        }
        break
      case 'SearchResource':
      case 'RelatedPinFeedResource':
      case 'CategoryFeedResource':
      case 'TopicFeedResource':
      case 'BoardFeedResource':
        xhrResponse = JSON.parse(xhrElem.dataset.response)
        chrome.runtime.sendMessage({type: xhrType, url: xhrElem.dataset.url, response: xhrResponse})
        payload = {
          type: 'examples',
          examples: xhrResponse.resource_response.data
        }
        break
      case 'RepinResource':
        xhrResponse = JSON.parse(xhrElem.dataset.response)
        chrome.runtime.sendMessage({type: xhrType, url: xhrElem.dataset.url, response: xhrResponse})
        const pinId = xhrResponse.resource.options.pin_id
        const location = window.location.href.split('/')
        const example = {
          id: pinId
        }
        let pinElement = ''

        if (location[3] === 'pin' && location[4] === pinId) {
          pinElement = document.querySelector('.pinImage') ? document.querySelector('.pinImage') : document.querySelector('.transitionImage .pinImg')
        } else {
          pinElement = document.querySelector(`.pinImageWrapper[href*="${pinId}"] img`)
        }

        example.src = pinElement.src
        example.aspectRatio = pinElement.getBoundingClientRect().height / pinElement.getBoundingClientRect().width

        payload = {
          type: 'add',
          example
        }
        break
    }

    if (payload) {
      chrome.runtime.sendMessage(payload)
    }
  })
})
