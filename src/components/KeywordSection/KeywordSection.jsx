import React from 'react'

import Section from '../Section'
import styles from './KeywordSection.css'

const KeywordSection = ({
  query,
  pins,
  backPoint = false
}) => {
  let title = ''
  if (backPoint) {
    title = 'Going back to searching for'
  } else {
    title = 'Searching for'
  }

  const keywordQuery = (
    <div className={styles.KeywordQuery}>"{query}"</div>
  )

  return (
    <Section
      title={title}
      query={keywordQuery}
      pins={pins} />
  )
}

export default KeywordSection
