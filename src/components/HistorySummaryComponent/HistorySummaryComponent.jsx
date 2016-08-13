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

  let historyTypeEl = ''
  let timestampEl = (
    <div className={styles.HistorySummaryComponent__timestamp}>
      <Time
        value={history.createdAt}
        format="MMM Do, h:mm a" />
    </div>
  )
  let historyIconEl = ''
  let historyQueryEl = ''

  if (history.type === 'search') {
    historyTypeEl = (
      <div className={styles.HistorySummaryComponent__type}>Search</div>
    )
    historyQueryEl = (
      <a
        target="_blank"
        href={`https://www.pinterest.com/search/pins/?q=${history.query}`}
        className={styles.HistorySummaryComponent__query}>'{history.query}'</a>
    )
    historyIconEl = (
      <div
        style={{backgroundImage: `url(${searchIcon})`}}
        className={styles.HistorySummaryComponent__icon} />
    )
  } else if (history.type === 'category') {
    historyTypeEl = (
      <div className={styles.HistorySummaryComponent__type}>Category</div>
    )
    historyQueryEl = (
      <a
        target="_blank"
        href={`https://www.pinterest.com/categories/${history.category}`}
        className={styles.HistorySummaryComponent__query}>'{history.category}'</a>
    )
    historyIconEl = (
      <div
        style={{backgroundImage: `url(${categoryIcon})`}}
        className={styles.HistorySummaryComponent__icon} />
    )
  } else if (history.type === 'topic') {
    historyTypeEl = (
      <div className={styles.HistorySummaryComponent__type}>Topic</div>
    )
    historyQueryEl = (
      <a
        target="_blank"
        href={`https://www.pinterest.com/topics/${history.topic}`}
        className={styles.HistorySummaryComponent__query}>'{history.topic}'</a>
    )
    historyIconEl = (
      <div
        style={{backgroundImage: `url(${categoryIcon})`}}
        className={styles.HistorySummaryComponent__icon} />
    )
  } else if (history.type === 'board') {
    historyTypeEl = (
      <div className={styles.HistorySummaryComponent__type}>Board</div>
    )
    historyQueryEl = (
      <a
        target="_blank"
        href={`https://www.pinterest.com/${history.boardAuthor}/${history.boardName}`}
        className={styles.HistorySummaryComponent__query}>'{history.boardName}'</a>
    )
    historyIconEl = (
      <div
        style={{backgroundImage: `url(${boardIcon})`}}
        className={styles.HistorySummaryComponent__icon} />
    )
  } else if (history.type === 'related') {
    historyTypeEl = (
      <div className={styles.HistorySummaryComponent__type}>related images</div>
    )
    historyIconEl = (
      <a
        target="_blank"
        href={`https://www.pinterest.com/pin/${history.pinId}`}
        className={styles.HistorySummaryComponent__image_wrapper}>
        <img
          src={history.pinUrl}
          className={styles.HistorySummaryComponent__image} />
      </a>
    )
  }

  return (
    <div className={styles.HistorySummaryComponent}>
      <Block n={1}>
        <Flex
          alignItems="center"
          justifyContent="space-between">
          <ListInline
            n={0.5}
            items={[historyTypeEl, historyQueryEl]} />

          {timestampEl}
        </Flex>
      </Block>

      <Media
        alignItems="center"
        figure={historyIconEl}
        body={<div className={styles.HistorySummaryComponent__examples}>{exampleElements}</div>} />
    </div>
  )
}

export default HistorySummaryComponent
