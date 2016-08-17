import React from 'react'
import {connect} from 'react-redux'

import ExampleList from '../ExampleList'

const CollectionView = ({
  examples
}) => {
  return (
    <ExampleList examples={examples} />
  )
}

export default connect(
  state => {
    return {
      examples: state.data.examples.sort((a, b) => {
        if (b.createdAt > a.createdAt) {
          return -1
        } else if (a.createdAt >= b.createdAt) {
          return 1
        }
      })
    }
  }
)(CollectionView)
