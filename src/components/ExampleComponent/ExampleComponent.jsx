import React from 'react'

import styles from './ExampleComponent.css'

const ExampleComponent = ({
  example,
  highlight,
  onMouseEnter,
  onMouseLeave
}) => {
  let classNames = [styles.ExampleComponent]
  if (example.isCollected) {
    classNames.push(styles.ExampleComponent__is_collected)
  }

  console.log(highlight)

  if (highlight === 'hovered') {
    classNames.push(styles.ExampleComponent__is_highlighted)
  } else if (highlight === 'adjacent') {
    classNames.push(styles.ExampleComponent__is_highlightedAdjacent)
  }

  return (
    <div
      className={classNames.join(' ')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave} />
  )
}

export default ExampleComponent
