import React from 'react'
import {connect} from 'react-redux'

import styles from './Example.css'

const Example = ({
  example,
  focusedGroupPage,
  focusedGroupQuery,
  highlightedExampleId
}) => {
  let classNames = [styles.Example, `${example.query.replace(/\s/g, '_').replace(/"/g, '')}-${example.relevance}`]
  if (focusedGroupQuery) {
    if (focusedGroupQuery !== example.query || focusedGroupPage !== example.relevance) {
      classNames.push(styles.Example_dimmed)
    }
  }

  if (highlightedExampleId === example._id) {
    classNames.push(styles.Example_highlighted)
  }

  return (
    <div
      id={example._id}
      className={classNames.join(' ')}>
      <div className={styles.Example__imageWrapper}>
        <img
          className={styles.Example__image}
          src={example.example.src} />
      </div>

      <div className={styles.Example__descriptionOverlay}>
        <div className={styles.Example__description}>
          {example.imageDescription}
        </div>
      </div>
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
