import React from 'react'

import styles from './ExamplesComponent.css'

const ExamplesComponent = ({
  examples,
  focusedExampleIndex,
  detailsViewShown,
  focusExampleCallback,
  clickExampleCallback
}) => {
  const exampleElements = examples.map((e, index) => {
    let classNames = [styles.ExamplesComponent__item]

    if (e.isCollected) {
      classNames.push(styles.ExamplesComponent__item_is_collected)
    }

    if (detailsViewShown) {
      if (index === focusedExampleIndex) {
        classNames.push(styles.ExamplesComponent__item_is_focused)
      } else if (index === focusedExampleIndex + 1 || index === focusedExampleIndex - 1) {
        classNames.push(styles.ExamplesComponent__item_is_focus_adjacent)
      }
    }

    return (
      <div
        key={index}
        className={classNames.join(' ')}
        onMouseOver={() => focusExampleCallback(index)}
        onClick={clickExampleCallback} />
    )
  })

  return (
    <div className={styles.ExamplesComponent}>
      {exampleElements}
    </div>
  )
}

export default ExamplesComponent
