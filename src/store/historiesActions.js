import 'whatwg-fetch'

export const RECEIVE_HISTORIES = 'RECEIVE_HISTORIES'

export const fetchHistories = () => {
  return dispatch => {
    fetch(`https://vdziubak.com/designFixationServer/history`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          dispatch({
            type: RECEIVE_HISTORIES,
            items: json.data.histories
          })
        } else {
          console.error(json.data)
        }
      })
  }
}
