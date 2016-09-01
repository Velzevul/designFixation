import React from 'react'

import styles from './Title.css'

const Title = ({
  title
}) => {
  return (
    <div className={styles.Title}>
      <div className={styles.Title__text}>{title}</div>
    </div>
  )
}

export default Title
