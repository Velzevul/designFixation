import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import configureStore from './store'
import {Provider} from 'react-redux'

import './styles/reset.css'

const store = configureStore()

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('designFixationApp'))
