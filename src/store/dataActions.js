import 'whatwg-fetch'

export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'

export const fetchData = () => {
  return dispatch => {
    dispatch({
      type: REQUEST_DATA
    })

    fetch('https://vdziubak.com/designFixationServer/examples', {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          dispatch({
            type: RECEIVE_DATA,
            items: json.data.examples
          })
        } else {
          console.error(json.data)
        }
      })
  }
}
