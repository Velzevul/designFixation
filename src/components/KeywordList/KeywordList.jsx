import React from 'react'
import {connect} from 'react-redux'

import styles from './KeywordList.css'
import Keyword from '../Keyword'

class KeywordList extends React.Component {
  render () {
    const {keywords} = this.props

    return (
      <div className={styles.KeywordList}>
        {keywords.map((k, index) =>
          <Keyword
            key={index}
            keyword={k} />
        )}
      </div>
    )
  }
}

export default connect(
  state => {
    const queries = state.ui.focusedQueries.length
      ? state.ui.focusedQueries
      : state.data.queries.map(q => q.query)
    const examples = state.data.examples.filter(e => queries.indexOf(e.query) !== -1)
    const stems = examples.reduce((carry, current) => [...carry, ...current.imageDescriptionStems], [])

    const keywords = []
    const stemIndexMap = {}

    for (let stem of stems) {
      const stemIndex = stemIndexMap[stem]
      if (stemIndex !== undefined) {
        keywords[stemIndex].frequency += 1
      } else {
        stemIndexMap[stem] = keywords.length
        keywords.push({
          frequency: 1,
          stem
        })
      }
    }

    return {
      keywords: keywords.sort((a, b) => b.frequency - a.frequency)
    }
  }
)(KeywordList)
