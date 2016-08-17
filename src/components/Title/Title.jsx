import React from 'react'

import styles from './Title.css'

const Title = ({
  title
}) => {
  return (
    <div className={styles.Title}>
      {title}
    </div>
  )
}

export default Title
