import React from 'react'
import {connect} from 'react-redux'

import styles from './Example.css'

const Example = ({
  example,
  focusedGroupPage,
  focusedGroupQuery,
  highlightedExampleId
}) => {
  let classNames = [styles.Example, example.query.replace(/\s/g, '_').replace(/"/g, ''), `page${example.relevance}`]
  if (focusedGroupPage) {
    if (focusedGroupQuery && focusedGroupQuery !== example.query) {
      classNames.push(styles.Example_dimmed)
    } else if (focusedGroupPage !== example.relevance) {
      classNames.push(styles.Example_dimmed)
    } else {
      classNames.push(styles.Example_focused)
    }
  }

  if (highlightedExampleId === example._id) {
    classNames.push(styles.Example_highlighted)
  }

  return (
    <div
      id={example._id}
      className={classNames.join(' ')}>
      <a
        href={`https://pinterest.com/pin/${example.example.id}`}
        className={styles.Example__imageWrapper}
        target="_blank">
        <img
          className={styles.Example__image}
          src={example.example.src} />

        <div className={styles.Example__description}>
          {example.imageDescription}
        </div>
      </a>
    </div>
  )
}

export default connect(
  (state, ownProps) => {
    return {
      focusedGroupPage: state.ui.focusedGroupPage,
      focusedGroupQuery: state.ui.focusedGroupQuery,
      highlightedExampleId: state.ui.highlightedExampleId
    }
  }
)(Example)
