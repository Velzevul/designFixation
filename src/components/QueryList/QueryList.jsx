import React from 'react'
import {connect} from 'react-redux'

import styles from './QueryList.css'
import Query from '../Query'
import List from '../../layouts/List'

class QueryList extends React.Component {
  render () {
    const {queries} = this.props

    return (
      <div className={styles.QueryList}>
        <List
          items={queries.map(q =>
            <Query query={q} />
          )} />
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      queries: state.data.queries
    }
  }
)(QueryList)
