import React from 'react'
import {connect} from 'react-redux'

import styles from './Keyword.css'

import {toggleFocusKeyword} from '../../store/uiActions'

const Keyword = ({
  keyword,
  focusedKeywords,
  toggleFocus,
  stemDictionary
}) => {
  let classNames = [styles.Keyword]
  if (focusedKeywords.indexOf(keyword.stem) !== -1) {
    classNames.push(styles.Keyword_isFocused)
  }

  return (
    <div
      onClick={toggleFocus}
      className={classNames.join(' ')}>
      {stemDictionary[keyword.stem]} ({keyword.frequency})
    </div>
  )
}

export default connect(
  state => {
    return {
      focusedKeywords: state.ui.focusedKeywords,
      stemDictionary: state.data.stemDictionary
    }
  },
  (dispatch, ownProps) => {
    const {keyword: {stem}} = ownProps

    return {
      toggleFocus: () => {
        dispatch(toggleFocusKeyword(stem))
      }
    }
  }
)(Keyword)
