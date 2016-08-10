import React from 'react'

import styles from './HistoryQueryComponent.css'
import Media from '../../layouts/Media'

import search from './search.svg'
import board from './board.svg'
import category from './category.svg'

const HistoryQueryComponent = ({
  history
}) => {
  let iconElement = ''
  let text = ''
  if (history.type === 'search') {
    iconElement = (
      <img
        src={search}
        className={styles.HistoryQueryComponent__icon} />
    )
    text = history.query
  } else if (history.type === 'board') {
    iconElement = (
      <img
        src={board}
        className={styles.HistoryQueryComponent__icon} />
    )
    text = `board ${history.boardName}`
  } else if (history.type === 'category' || history.type === 'topic') {
    iconElement = (
      <img
        src={category}
        className={styles.HistoryQueryComponent__icon} />
    )
    text = `category ${history.category || history.topic}`
  } else if (history.type === 'related') {
    iconElement = (
      <div className={styles.HistoryQueryComponent__image_wrapper}>
        <img
          src={history.pinUrl}
          className={styles.HistoryQueryComponent__image} />
      </div>
    )
    text = 'related images'
  }

  const textEl = (
    <div className={styles.HistoryQueryComponent__text}>{text}</div>
  )

  return (
    <div className={styles.HistoryQueryComponent}>
      <Media
        reverse
        alignItems="center"
        figure={iconElement}
        body={textEl} />
    </div>
  )
}

export default HistoryQueryComponent
