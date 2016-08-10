import React from 'react'

import styles from './DetailsViewComponent.css'

const DetailsViewComponent = ({
  examples,
  focus,
  toggleCallback
}) => {
  const IMAGE_WIDTH = 200

  const wrapperStyle = {
    width: (IMAGE_WIDTH) * examples.length,
    left: -focus * (IMAGE_WIDTH) + (window.innerWidth - IMAGE_WIDTH) / 2
  }

  const exampleElements = examples.map((e, index) => {
    let classNames = [styles.DetailsViewComponent__image]

    if (e.isCollected) {
      classNames.push(styles.DetailsViewComponent__image_is_collected)
    }

    return (
      <div
        key={index}
        className={styles.DetailsViewComponent__imgWrapper}>
        <img
          src={e.url}
          className={classNames.join(' ')} />
      </div>
    )
  })

  return (
    <div className={styles.DetailsViewComponent}>
      <div
        style={wrapperStyle}
        className={styles.DetailsViewComponent__wrapper}>
        {exampleElements}
      </div>
    </div>
  )
}

export default DetailsViewComponent
