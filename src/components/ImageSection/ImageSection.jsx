import React from 'react'

import Section from '../Section'
import styles from './ImageSection.css'

const ImageSection = ({
  id,
  image,
  pins
}) => {
  const imageQuery = (
    <a
      href={`https://www.pinterest.com/pin/${id}`}
      className={styles.ImageQuery}>
      <img className={styles.ImageQuery__img} src={image} />
    </a>
  )

  return (
    <Section
      title="Searching for related images"
      query={imageQuery}
      pins={pins} />
  )
}

export default ImageSection
