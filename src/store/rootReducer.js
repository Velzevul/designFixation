import {combineReducers} from 'redux'
import popup from './popupReducer'
import history from './historyReducer'

const rootReducer = combineReducers({
  popup,
  history
})

export default rootReducer
