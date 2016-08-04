export const SHOW_POPUP = 'SHOW_POPUP'
export const HIDE_POPUP = 'HIDE_POPUP'
export const SCHEDULE_HIDE_POPUP = 'SCHEDULE_HIDE_POPUP'
export const SET_POPUP_TARGET = 'SET_POPUP_TARGET'

export const showPopup = () => {
  return (dispatch, getState) => {
    const timeoutId = getState().popup.timeoutId
    window.clearTimeout(timeoutId)

    dispatch({
      type: SHOW_POPUP
    })
  }
}

export const scheduleHidePopup = () => {
  return (dispatch, getState) => {
    const timeoutId = window.setTimeout(() => {
      dispatch({
        type: HIDE_POPUP
      })
    }, 300)

    dispatch({
      type: SCHEDULE_HIDE_POPUP,
      timeoutId
    })
  }
}

export const setPopupTarget = (
  currentIndex,
  historyId
) => {
  return {
    type: SET_POPUP_TARGET,
    currentIndex,
    historyId
  }
}
