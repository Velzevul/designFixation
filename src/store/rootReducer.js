import {combineReducers} from 'redux'
import data from './dataReducer'
import ui from './uiReducer'
import study from './studyReducer'

const rootReducer = combineReducers({
  data,
  ui,
  study
})

export default rootReducer
