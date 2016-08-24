import React from 'react'
import {connect} from 'react-redux'

import styles from './KeywordView.css'
import ExampleList from '../ExampleList'
import KeywordExampleList from '../KeywordExampleList'

const KeywordView = ({
  focusedKeywords,
  examples
}) => {
  const nonKeywordExamples = examples.filter(e => {
    for (let fk of focusedKeywords) {
      if (e.imageDescriptionStems.indexOf(fk) !== -1) {
        return false
      }
    }

    return true
  })

  return (
    <div className={styles.KeywordView}>
      {focusedKeywords.map((k, index) =>
        <KeywordExampleList
          key={index}
          keyword={k}
          examples={examples} />
      )}

      <ExampleList
        nCols={8}
        examples={nonKeywordExamples} />
    </div>
  )
}

export default connect(
  state => {
    return {
      examples: state.data.examples,
      focusedKeywords: state.ui.focusedKeywords
    }
  }
)(KeywordView)
