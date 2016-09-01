import React from 'react'
import {connect} from 'react-redux'

import styles from './ExamplesBarItem.css'
import {highlightExample} from '../../store/uiActions'

const ExamplesBarItem = ({
  example,
  highlightedExampleId,
  highlightExample,
  dimExample
}) => {
  return (
    <div
      onMouseEnter={highlightExample}
      onMouseLeave={dimExample}
      className={`${styles.ExamplesBarItem} ${highlightedExampleId === example._id ? styles.ExamplesBarItem_highlighted : ''}`} />
  )
}

export default connect(
  state => {
    return {
      highlightedExampleId: state.ui.highlightedExampleId
    }
  },
  (dispatch, ownProps) => {
    return {
      highlightExample: () => {
        dispatch(highlightExample(ownProps.example._id))
      },
      dimExample: () => {
        dispatch(highlightExample(null))
      }
    }
  }
)(ExamplesBarItem)
