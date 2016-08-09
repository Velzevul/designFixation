chrome.runtime.onMessage.addListener(request => {
  if (request.type === 'history') {
    fetch('https://vdziubak.com/designFixationServer/history/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.payload)
    })
    .then(response => response.json())
    .then(json => {
      console.log('history: ', request.payload, json)
    })
  } else if (request.type === 'examples') {
    fetch('https://vdziubak.com/designFixationServer/history/latest/examples/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.payload)
    })
    .then(response => response.json())
    .then(json => {
      console.log('history: ', request.payload, json)
    })
  }
})
