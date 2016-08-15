import React from 'react'
import {connect} from 'react-redux'

import styles from './App.css'
import TaskDescription from '../TaskDescription'
import QueryList from '../QueryList'
import ExampleList from '../ExampleList'

import {fetchData} from '../../store/dataActions'

class App extends React.Component {
  componentWillMount () {
    const {fetchData} = this.props

    fetchData()
  }

  render () {
    const {isFetching} = this.props

    if (isFetching) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <div className={styles.App}>
          <div className={styles.App__header}>
            <TaskDescription />
          </div>

          <div className={styles.App__body}>
            <div className={styles.App__sidebar}>
              <QueryList />
            </div>

            <div className={styles.App__main}>
              <ExampleList />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default connect(
  state => {
    return {
      isFetching: state.data.isFetching
    }
  },
  dispatch => {
    return {
      fetchData: () => {
        dispatch(fetchData())
      }
    }
  }
)(App)
