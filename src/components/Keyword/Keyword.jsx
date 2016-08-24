import React from 'react'
import {connect} from 'react-redux'

import styles from './Keyword.css'

import {toggleFocusKeyword} from '../../store/uiActions'

const Keyword = ({
  keyword,
  focusedKeywords,
  toggleFocus
}) => {
  let classNames = [styles.Keyword]
  if (focusedKeywords.indexOf(keyword.keyword) !== -1) {
    classNames.push(styles.Keyword_isFocused)
  }

  return (
    <div
      onClick={toggleFocus}
      className={classNames.join(' ')}>
      {keyword.keyword} ({keyword.frequency})
    </div>
  )
}

export default connect(
  state => {
    return {
      focusedKeywords: state.ui.focusedKeywords
    }
  },
  (dispatch, ownProps) => {
    const {keyword: {keyword}} = ownProps

    return {
      toggleFocus: () => {
        dispatch(toggleFocusKeyword(keyword))
      }
    }
  }
)(Keyword)
