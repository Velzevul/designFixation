import React from 'react'
import Time from 'react-time'

import styles from './HistorySummaryComponent.css'
import Block from '../../layouts/Block'
import Media from '../../layouts/Media'
import Flex from '../../layouts/Flex'
import ListInline from '../../layouts/ListInline'

import searchIcon from './search.svg'
import categoryIcon from './category.svg'
import boardIcon from './board.svg'

const HistorySummaryComponent = ({
  history,
  focusedExampleIndex,
  detailsViewShown,
  focusExampleCallback,
  clickExampleCallback
}) => {
  const exampleElements = history.examples.map((e, index) => {
    let classNames = [styles.HistorySummaryComponent__example]

    if (e.isCollected) {
      classNames.push(styles.HistorySummaryComponent__example_is_collected)
    }

    if (detailsViewShown) {
      if (index === focusedExampleIndex) {
        classNames.push(styles.HistorySummaryComponent__example_is_focused)
      } else if (index === focusedExampleIndex + 1 || index === focusedExampleIndex - 1) {
        classNames.push(styles.HistorySummaryComponent__example_is_focus_adjacent)
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

  let timestampEl = (
    <div className={styles.HistorySummaryComponent__timestamp}>
      <Time
        value={history.createdAt}
        format="MMM Do, h:mm a" />
    </div>
  )
  let historyQueryEl = ''

  if (history.type === 'search') {
    historyQueryEl = (
      <a
        target="_blank"
        href={`https://www.pinterest.com/search/pins/?q=${history.query}`}
        className={styles.HistorySummaryComponent__query}>{history.query}</a>
    )
  } else if (history.type === 'category') {
    historyQueryEl = (
      <a
        target="_blank"
        href={`https://www.pinterest.com/categories/${history.category}`}
        className={styles.HistorySummaryComponent__query}>{history.category}</a>
    )
  } else if (history.type === 'topic') {
    historyQueryEl = (
      <a
        target="_blank"
        href={`https://www.pinterest.com/topics/${history.topic}`}
        className={styles.HistorySummaryComponent__query}>{history.topic}</a>
    )
  } else if (history.type === 'board') {
    historyQueryEl = (
      <a
        target="_blank"
        href={`https://www.pinterest.com/${history.boardAuthor}/${history.boardName}`}
        className={styles.HistorySummaryComponent__query}>{history.boardName}</a>
    )
  } else if (history.type === 'related') {
    // historyIconEl = (
    //   <a
    //     target="_blank"
    //     href={`https://www.pinterest.com/pin/${history.pinId}`}
    //     className={styles.HistorySummaryComponent__image_wrapper}>
    //     <img
    //       src={history.pinUrl}
    //       className={styles.HistorySummaryComponent__image} />
    //   </a>
    // )
  }

  return (
    <div className={styles.HistorySummaryComponent}>
      <Media
        figure={historyQueryEl}
        body={<div className={styles.HistorySummaryComponent__examples}>{exampleElements}</div>} />
    </div>
  )
}

export default HistorySummaryComponent
