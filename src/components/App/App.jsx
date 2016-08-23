import React from 'react'
import {connect} from 'react-redux'

import styles from './App.css'
import TaskDescription from '../TaskDescription'
import QueryList from '../QueryList'
import CollectionView from '../CollectionView'
import QueryView from '../QueryView'

import socket from '../../store/socket'
import {receiveData, receiveExample, receiveQuery} from '../../store/dataActions'
import {receiveStudy} from '../../store/studyActions'

class App extends React.Component {
  componentWillMount () {
    const {dispatch} = this.props

    socket.emit('get study')

    socket.on('study', (data) => {
      dispatch(receiveStudy(data.participantId, data.sessionId, data.condition, data.taskAlias))
      socket.emit('get data', {sessionId: data.sessionId, taskAlias: data.taskAlias})
    })

    socket.on('confirm create example', e => {
      dispatch(receiveExample(e))
    })

    socket.on('confirm create query', q => {
      dispatch(receiveQuery(q))
    })

    socket.on('data', (data) => {
      dispatch(receiveData(data.queries, data.examples, data.task))
    })
  }

  render () {
    const {focusedQueries} = this.props

    let bodyEl = ''
    if (focusedQueries.length > 0) {
      bodyEl = (
        <QueryView />
      )
    } else {
      bodyEl = (
        <CollectionView />
      )
    }

    return (
      <div className={styles.App}>
        <div className={styles.AppSidebar}>
          <div className={styles.AppSidebar__header}>
            <TaskDescription />
          </div>

          <div className={styles.AppSidebar__body}>
            <QueryList />
          </div>
        </div>

        <div className={styles.App__main}>
          {bodyEl}
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      sessionId: state.study.sessionId,
      taskAlias: state.study.taskAlias,
      focusedQueries: state.ui.focusedQueries
    }
  }
)(App)
