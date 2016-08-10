import {combineReducers} from 'redux'
import popup from './popupReducer'
import histories from './historiesReducer'

const rootReducer = combineReducers({
  popup,
  histories
})

export default rootReducer
