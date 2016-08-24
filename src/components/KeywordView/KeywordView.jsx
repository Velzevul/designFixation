import React from 'react'
import {connect} from 'react-redux'

import styles from './KeywordView.css'
import ExampleList from '../ExampleList'
import KeywordExampleList from '../KeywordExampleList'

const KeywordView = ({
  focusedKeywords,
  examples
}) => {
  const focusedKeywordsRegexp = new RegExp(`(${focusedKeywords.join('|')})`)
  const nonKeywordExamples = examples.filter(e => !focusedKeywordsRegexp.test(e.imageDescription))

  return (
    <div className={styles.KeywordView}>
      {focusedKeywords.map((k, index) =>
        <KeywordExampleList
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
