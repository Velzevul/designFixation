import React from 'react'
import {connect} from 'react-redux'

import styles from './App.css'
import QueryList from '../QueryList'
import CollectionView from '../CollectionView'
import Summary from '../Summary'
import Title from '../Title'

import socket from '../../store/socket'
import {receiveData, receiveExample, receiveQuery} from '../../store/dataActions'
import {receiveStudy, killStudy} from '../../store/studyActions'

const scrollTo = (element, to, duration) => {
  if (duration > 0) {
    const difference = to - element.scrollTop
    const perTick = difference / duration * 10

    setTimeout(() => {
      element.scrollTop = element.scrollTop + perTick
      if ((difference > 0 && element.scrollTop < to) ||
          (difference < 0 && element.scrollTop > to)) {
        scrollTo(element, to, duration - 10)
      }
    }, 10)
  }
}

class App extends React.Component {
  componentWillReceiveProps (newProps) {
    const {focusedGroupPage, focusedGroupQuery} = newProps

    if (focusedGroupPage !== this.props.focusedGroupPage && focusedGroupQuery !== this.props.focusedGroupQuery) {
      if (focusedGroupQuery) {
        const matchingElements = Array.prototype.slice.call(document.querySelectorAll(`.${focusedGroupQuery.replace(/\s/g, '_').replace(/"/g, '')}-${focusedGroupPage}`))
        const topMatchingElement = matchingElements.sort((a, b) => {
          return a.offsetTop - b.offsetTop
        })[0]

        scrollTo(this._main, topMatchingElement.offsetTop, 200)
      }
    }
  }

  componentWillMount () {
    const {dispatch} = this.props

    socket.emit('get study')

    socket.on('study', (data) => {
      dispatch(receiveStudy(data.participantId, data.sessionId, data.condition, data.taskAlias))
      socket.emit('get data', {sessionId: data.training ? 'test' : data.sessionId, taskAlias: data.taskAlias})
    })

    socket.on('confirm kill study', () => {
      dispatch(killStudy())
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
    const {condition} = this.props

    let sidebarEl = ''
    if (condition === 'system') {
      sidebarEl = (
        <div className={styles.AppSidebar}>
          <div className={styles.AppSidebar__heading}>
            <Title title="Collection Summary" />
          </div>

          <div className={styles.AppSidebar__section}>
            <Summary />
          </div>

          <div className={styles.AppSidebar__heading}>
            <Title title="Search History" />
          </div>

          <div className={`${styles.AppSidebar__section} ${styles.AppSidebar__section_full}`}>
            <QueryList />
          </div>
        </div>
      )
    }

    return (
      <div className={styles.App}>
        {sidebarEl}

        <div
          ref={(el) => { this._main = el }}
          className={styles.App__main}>
          <CollectionView />
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      sessionId: state.study.sessionId,
      condition: state.study.condition,
      focusedGroupPage: state.ui.focusedGroupPage,
      focusedGroupQuery: state.ui.focusedGroupQuery
    }
  }
)(App)
