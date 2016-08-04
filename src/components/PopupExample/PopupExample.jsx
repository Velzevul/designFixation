import React from 'react'

import styles from './PopupExample.css'

const PopupExample = ({
  example
}) => {
  const style = {
    backgroundImage: example ? `url('${example.url}')` : ''
  }

  return (
    <div
      style={style}
      className={`${styles.PopupExample} ${example && example.isCollected ? styles.PopupExample__is_collected : ''}`} />
  )
}

export default PopupExample
