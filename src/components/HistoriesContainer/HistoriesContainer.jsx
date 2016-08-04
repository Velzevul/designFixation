import React from 'react'
import {connect} from 'react-redux'

import {fetchHistory} from '../../store/historyActions'
import LoadingComponent from '../LoadingComponent'
import HistoriesComponent from '../HistoriesComponent'

class HistoriesContainer extends React.Component {
  componentWillMount () {
    const {fetchHistory} = this.props

    fetchHistory()
  }

  render () {
    const {items, isFetching} = this.props

    if (isFetching) {
      return (
        <LoadingComponent />
      )
    } else {
      return (
        <HistoriesComponent items={items} />
      )
    }
  }
}

export default connect(
  state => {
    return {
      isFetching: state.history.isFetching,
      items: state.history.items
    }
  },
  dispatch => {
    return {
      fetchHistory: () => {
        dispatch(fetchHistory())
      }
    }
  }
)(HistoriesContainer)
