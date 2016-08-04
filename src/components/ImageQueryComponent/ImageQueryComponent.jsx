import React from 'react'

import styles from './ImageQueryComponent.css'

import Media from '../../layouts/Media'

const ImageQueryComponent = ({
  image
}) => {
  const imgComponent = (
    <div className={styles.ImageQueryComponent__image}>
      <img src={image.url} />
    </div>
  )

  const textComponent = (
    <div className={styles.ImageQueryComponent__text}>related</div>
  )
  return (
    <div className={styles.ImageQueryComponent}>
      <Media
        n={1}
        alignItems="center"
        figure={imgComponent}
        body={textComponent} />
    </div>
  )
}

export default ImageQueryComponent
