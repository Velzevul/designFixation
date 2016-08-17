import React from 'react'
import {connect} from 'react-redux'

import styles from './Query.css'

import {toggleFocusQuery} from '../../store/uiActions'

const Query = ({
  query,
  focusedQueries,
  toggleFocus
}) => {
  let style = {}
  let classNames = [styles.Query]
  if (focusedQueries.indexOf(query.query) !== -1) {
    style.backgroundColor = `rgba(${query.color.slice(4, query.color.length - 1)}, 0.3)`
    classNames.push(styles.Query_isFocused)
  }

  return (
    <div
      onClick={toggleFocus}
      style={style}
      className={classNames.join(' ')}>
      {query.query} ({query.examplesCount})
    </div>
  )
}

export default connect(
  state => {
    return {
      focusedQueries: state.ui.focusedQueries
    }
  },
  (dispatch, ownProps) => {
    const {query: {query}} = ownProps

    return {
      toggleFocus: () => {
        dispatch(toggleFocusQuery(query))
      }
    }
  }
)(Query)
