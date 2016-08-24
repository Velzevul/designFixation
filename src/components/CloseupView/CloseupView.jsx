import React from 'react'
import {connect} from 'react-redux'

import styles from './CloseupView.css'
import Block from '../../layouts/Block'
import {blurExample, focusExample} from '../../store/uiActions'

const CloseupView = ({
  focusExample,
  blurExample,
  focusedExample,
  nextExampleId,
  previousExampleId,
  condition
}) => {
  return (
    <div className={styles.CloseupView}>
      <button
        onClick={blurExample}
        className={styles.CloseupView__close} />

      <button
        onClick={() => { focusExample(previousExampleId) }}
        className={`${styles.CloseupView__nav} ${styles.CloseupView__nav_left}`} />

      <div className={styles.CloseupView__image}>
        <img
          className={styles.CloseupView__img}
          src={focusedExample.example.src} />
      </div>

      <div className={styles.CloseupView__body}>
        <Block>
          <div className={styles.CloseupView__imgDescription}>{focusedExample.imageDescription}</div>
        </Block>

        {condition === 'system'
          ? <div className={styles.CloseupView__imgQueryText}>
            {focusedExample.relevance === -1
              ? 'Collected by browsing relevant images for '
              : 'Collected by browsing search results for '
            }
            <div className={styles.CloseupView__imgQuery}>{focusedExample.query}</div>
          </div>
          : ''
        }
      </div>

      <button
        onClick={() => { focusExample(nextExampleId) }}
        className={`${styles.CloseupView__nav} ${styles.CloseupView__nav_right}`} />
    </div>
  )
}

export default connect(
  state => {
    const queries = state.ui.focusedQueries.length
      ? state.ui.focusedQueries
      : state.data.queries.map(q => q.query)
    const examples = state.data.examples.filter(e => queries.indexOf(e.query) !== -1)

    let focusedExampleIndex = null
    let previousExampleIndex = null
    let nextExampleIndex = null
    for (let i = 0; i < examples.length; i++) {
      if (examples[i]._id === state.ui.focusedExample) {
        focusedExampleIndex = i
        previousExampleIndex = i === 0 ? examples.length - 1 : i - 1
        nextExampleIndex = i === examples.length - 1 ? 0 : i + 1
        break
      }
    }

    return {
      condition: state.study.condition,
      focusedExample: examples[focusedExampleIndex],
      previousExampleId: examples[previousExampleIndex]._id,
      nextExampleId: examples[nextExampleIndex]._id
    }
  },
  dispatch => {
    return {
      blurExample: () => {
        dispatch(blurExample())
      },
      focusExample: (id) => {
        dispatch(focusExample(id))
      }
    }
  }
)(CloseupView)
