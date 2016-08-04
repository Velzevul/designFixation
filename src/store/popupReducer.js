import {SHOW_POPUP, HIDE_POPUP, SCHEDULE_HIDE_POPUP, SET_POPUP_TARGET} from './popupActions'
import initialState from './initialState'

const popup = (
  state = initialState.popup,
  action
) => {
  switch (action.type) {
    case SHOW_POPUP:
      return Object.assign({}, state, {
        isShown: true
      })
    case HIDE_POPUP:
      return Object.assign({}, state, {
        isShown: false,
        timeoutId: null
      })
    case SCHEDULE_HIDE_POPUP:
      return Object.assign({}, state, {
        timeoutId: action.timeoutId
      })
    case SET_POPUP_TARGET:
      return Object.assign({}, state, {
        currentIndex: action.currentIndex,
        historyId: action.historyId
      })
    default:
      return state
  }
}

export default popup
