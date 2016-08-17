import {combineReducers} from 'redux'
import data from './dataReducer'
import ui from './uiReducer'

const rootReducer = combineReducers({
  data,
  ui
})

export default rootReducer
