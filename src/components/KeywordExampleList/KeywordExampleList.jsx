import React from 'react'

import styles from './KeywordExampleList.css'
import ExampleList from '../ExampleList'
import Block from '../../layouts/Block'

const KeywordExampleList = ({
  keyword,
  examples
}) => {
  const filteredExamples = examples.filter(e => e.imageDescription.indexOf(keyword) !== -1)

  if (filteredExamples.length) {
    return (
      <Block>
        <div
          key={keyword}
          className={styles.KeywordExampleList}>
          <div className={styles.KeywordExampleList__keyword}>{keyword}</div>

          <div className={styles.KeywordExampleList__examples}>
            <ExampleList
              nCols={7}
              examples={filteredExamples} />
          </div>
        </div>
      </Block>
    )
  } else {
    return (
      <span></span>
    )
  }
}

export default KeywordExampleList
