import React from 'react'
import {connect} from 'react-redux'

import styles from './Example.css'
import {toggleHighlightQuery, focusExample} from '../../store/uiActions'

const Example = ({
  example,
  compact,
  color,
  focusedQueries,
  highlightedQuery,
  highlightQuery,
  focusExample
}) => {
  let style = {}
  let classNames = [styles.Example]
  if (compact) {
    classNames.push(styles.Example_compact)
  }
  if (focusedQueries.length > 1 && highlightedQuery === example.query) {
    style.backgroundColor = `rgba(${color.slice(4, color.length - 1)}, 0.3)`
  }

  return (
    <div
      onMouseEnter={highlightQuery}
      onMouseLeave={highlightQuery}
      onClick={focusExample}
      style={style}
      className={classNames.join(' ')}>
      <div className={styles.Example__imageWrapper}>
        <img
          className={styles.Example__image}
          src={example.example.src} />
      </div>

      <div className={styles.Example__description}>
        {example.imageDescription}
      </div>
    </div>
  )
}

export default connect(
  (state, ownProps) => {
    return {
      focusedQueries: state.ui.focusedQueries,
      highlightedQuery: state.ui.highlightedQuery,
      color: state.data.queries.filter(q => q.query === ownProps.example.query)[0].color
    }
  },
  (dispatch, ownProps) => {
    return {
      highlightQuery: () => {
        const {example: {query}} = ownProps

        dispatch(toggleHighlightQuery(query))
      },
      focusExample: (e) => {
        const {example: {_id}} = ownProps

        dispatch(focusExample(_id))
      }
    }
  }
)(Example)
