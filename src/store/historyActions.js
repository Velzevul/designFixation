import 'whatwg-fetch'

export const REQUEST_FETCH_HISTORY = 'REQUEST_FETCH_HISTORY'
export const CONFIRM_FETCH_HISTORY = 'CONFIRM_FETCH_HISTORY'
export const REJECT_FETCH_HISTORY = 'REJECT_FETCH_HISTORY'

const requestFetch = () => {
  return {
    type: REQUEST_FETCH_HISTORY
  }
}

const receiveFetch = (
  items
) => {
  return {
    type: CONFIRM_FETCH_HISTORY,
    items
  }
}

const rejectFetch = (
  error
) => {
  return {
    type: REJECT_FETCH_HISTORY,
    error
  }
}

export const fetchHistory = () => {
  return dispatch => {
    dispatch(requestFetch())

    fetch(`${process.env.DESIGN_FIXATION_SERVER_URL}/history`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          dispatch(receiveFetch(json.data.histories))
        } else {
          dispatch(rejectFetch('Could not fetch history. Check console for details'))
          console.error(json.data)
        }
      })
  }
}
