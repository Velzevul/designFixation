import React from 'react'

import styles from './PopupComponent.css'

import ListInline from '../../layouts/ListInline'
import PopupExample from '../PopupExample'
import PopupDummyExample from '../PopupDummyExample'

const PopupComponent = ({
  previousExample,
  hoveredExample,
  nextExample,
  style
}) => {
  const examples = [
    previousExample ? <PopupExample example={previousExample} /> : <PopupDummyExample />,
    <PopupExample example={hoveredExample} />,
    nextExample ? <PopupExample example={nextExample} /> : <PopupDummyExample />
  ]

  return (
    <div
      style={style}
      className={styles.PopupComponent}>
      <ListInline
        n={1}
        items={examples} />
    </div>
  )
}

export default PopupComponent
