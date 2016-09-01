import React from 'react'
import {connect} from 'react-redux'

import styles from './QueryList.css'
import Query from '../Query'
import List from '../../layouts/List'

class QueryList extends React.Component {
  render () {
    const {queries} = this.props

    return (
      <List
        n={1.5}
        items={queries.map((q, index) =>
            <Query
              key={index}
              query={q} />
        )} />
    )
  }
}

export default connect(
  state => {
    return {
      queries: [...state.data.queries].sort((a, b) => b.examplesCount - a.examplesCount)
    }
  }
)(QueryList)
