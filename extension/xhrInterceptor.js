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
    let payload = null

    switch (xhrType) {
      case 'BaseSearchResource':
        payload = {
          type: 'examples',
          examples: xhrElem.dataset.response.resource_response.data.results
        }
        break
      case 'SearchResource':
      case 'RelatedPinFeedResource':
      case 'CategoryFeedResource':
      case 'TopicFeedResource':
      case 'BoardFeedResource':
        payload = {
          type: 'examples',
          examples: xhrElem.dataset.response.resource_response.data
        }
        break
      case 'RepinResource':
        const pinId = xhrElem.dataset.response.resource.options.pin_id
        const location = window.location.split('/')
        let example = {
          id: pinId
        }

        if (location[3] === 'pin' && location[4] === pinId) {
          example.img = document.querySelector('')
        }

        const pinWrapper = document.querySelectorAll('.pinImageWrapper')

        payload = {
          type: 'add',
          example
        }

        break
    }
    // const payload = {
    //   type: 'xhr',
    //   method: xhrElem.dataset.method,
    //   url: xhrElem.dataset.url,
    //   data: xhrElem.dataset.data,
    //   response: xhrElem.dataset.response
    // }

    if (payload) {
      chrome.runtime.sendMessage(payload)
    }
  })
})
