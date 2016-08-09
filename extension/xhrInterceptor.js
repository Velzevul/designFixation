'use strict'

const XHRInterceptor = function () {
  'use strict'

  var div = document.createElement('div')

  div.id = 'XhrElem'
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

  const XhrElem = document.getElementById('XhrElem')
  XhrElem.addEventListener('XhrCall', () => {
    const payload = {
      type: 'xhr',
      method: XhrElem.dataset.method,
      url: XhrElem.dataset.url,
      data: XhrElem.dataset.data,
      response: XhrElem.dataset.response
    }

    chrome.runtime.sendMessage(payload)
  })
})
