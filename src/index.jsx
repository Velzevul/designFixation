import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import AppComponent from './components/AppComponent'
import configureStore from './store'
import {Provider} from 'react-redux'

import './styles/reset.css'

const store = configureStore()

ReactDOM.render((
  <Provider store={store}>
    <AppComponent />
  </Provider>
), document.getElementById('designFixationApp'))
