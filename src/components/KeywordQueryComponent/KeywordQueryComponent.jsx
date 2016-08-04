import React from 'react'

import styles from './KeywordQueryComponent.css'

import Media from '../../layouts/Media'

const KeywordQueryComponent = ({
  keyword
}) => {
  const iconElment = (
    <div className={styles.KeywordQueryComponent__icon} />
  )

  const textElement = (
    <div className={styles.KeywordQueryComponent__text}>{keyword}</div>
  )

  return (
    <div className={styles.KeywordQueryComponent}>
      <Media
        n={0.5}
        alignItems="center"
        figure={iconElment}
        body={textElement} />
    </div>
  )
}

export default KeywordQueryComponent
