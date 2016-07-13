import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './rootReducer'

const middleware = [thunkMiddleware]

if (NODE_ENV === 'development') {
  const logger = createLogger()
  middleware.push(logger)
}

const configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )
}

export default configureStore
