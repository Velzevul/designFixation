import React from 'react'

import styles from './Pin.css'

const Pin = ({
  pin
}) => {
  return (
    <a
      className={styles.Pin}
      href={`https://www.pinterest.com/pin/${pin.id}/`}>
      <img src={pin.imageUrl} />
    </a>
  )
}

export default Pin
