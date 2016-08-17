import React from 'react'
import {connect} from 'react-redux'

import styles from './Example.css'
import {toggleHighlightQuery} from '../../store/uiActions'

const Example = ({
  example,
  compact,
  color,
  focusedQueries,
  highlightedQuery,
  highlightQuery
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
      style={style}
      className={classNames.join(' ')}>
      <div className={styles.Example__imageWrapper}>
        <img
          className={styles.Example__image}
          src={example.example.src} />
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
        const {query} = ownProps.example

        dispatch(toggleHighlightQuery(query))
      }
    }
  }
)(Example)
