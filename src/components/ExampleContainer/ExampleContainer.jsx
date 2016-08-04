import React from 'react'
import {connect} from 'react-redux'

import {showPopup, scheduleHidePopup, setPopupTarget} from '../../store/popupActions'
import ExampleComponent from '../ExampleComponent'

class ExampleContainer extends React.Component {
  render () {
    const {example, highlight, onMouseEnter, onMouseLeave} = this.props

    return (
      <ExampleComponent
        example={example}
        highlight={highlight}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave} />
    )
  }
}

export default connect(
  (state, ownProps) => {
    const {index, historyId} = ownProps
    const {popup: {currentIndex, historyId: popupHistoryId, isShown}} = state

    let highlight = 'none'
    if (isShown && historyId === popupHistoryId) {
      console.log(index, currentIndex)
      if (index === currentIndex) {
        highlight = 'hovered'
      } else if (index === currentIndex - 1 || index === currentIndex + 1) {
        highlight = 'adjacent'
      }
    }

    return {
      highlight
    }
  },
  (dispatch, ownProps) => {
    const {index, historyId} = ownProps

    return {
      onMouseEnter: () => {
        dispatch(setPopupTarget(index, historyId))
        dispatch(showPopup())
      },
      onMouseLeave: () => {
        dispatch(scheduleHidePopup())
      }
    }
  }
)(ExampleContainer)
