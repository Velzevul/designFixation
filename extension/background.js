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
  } else if (request.type === 'xhr' && request.url === '/resource/RepinResource/create/') {
    const exampleId = JSON.parse(request.response).resource.options.pin_id

    fetch(`https://vdziubak.com/designFixationServer/history/latest/examples/${exampleId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log('example: ', json)
    })
  }
})
