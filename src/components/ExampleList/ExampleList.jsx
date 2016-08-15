import React from 'react'
import {connect} from 'react-redux'

import styles from './ExampleList.css'
import Example from '../Example'
import List from '../../layouts/List'

class ExampleList extends React.Component {
  render () {
    const {examples} = this.props

    const columns = []
    const nCols = 4

    for (let i = 0; i < nCols; i++) {
      const column = examples.filter((e, index) => {
        return index % nCols === i
      }).map(e =>
        <Example example={e} />
      )

      columns.push(
        <List
          key={i}
          items={column} />
      )
    }

    return (
      <div className={styles.ExampleList}>
        {columns}
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      examples: state.data.examples
    }
  }
)(ExampleList)
