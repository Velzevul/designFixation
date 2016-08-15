import React from 'react'
import {connect} from 'react-redux'

import {fetchHistories} from '../../store/historiesActions'
import HistoryContainer from '../HistoryContainer'
import List from '../../layouts/List'

class HistoriesContainer extends React.Component {
  componentWillMount () {
    const {fetchHistories} = this.props

    setInterval(fetchHistories, 200)
  }

  render () {
    const {items} = this.props

    const historyItems = items.map(i =>
      <HistoryContainer history={i} />
    )

    return (
      <List
        alignItems="stretch"
        n={0}
        items={historyItems} />
    )
  }
}

export default connect(
  state => {
    return {
      items: state.histories.items
    }
  },
  dispatch => {
    return {
      fetchHistories: () => {
        dispatch(fetchHistories())
      }
    }
  }
)(HistoriesContainer)
