import React from 'react'
import {connect} from 'react-redux'

import PopupComponent from '../PopupComponent'

class PopupContainer extends React.Component {
  constructor (props) {
    super(props)

    this.mouseMoveHandler = this.mouseMoveHandler.bind(this)

    this.state = {
      x: 1000,
      y: 1000
    }
  }

  mouseMoveHandler (e) {
    this.setState({
      x: e.clientX + 20,
      y: e.clientY + 20
    })
  }

  componentDidMount () {
    document.addEventListener('mousemove', this.mouseMoveHandler, false)
  }

  componentWillUnmount () {
    document.removeEventListener('mousemove', this.mouseMoveHandler, false)
  }

  render () {
    const {isShown, previousExample, hoveredExample, nextExample} = this.props

    const style = {
      display: isShown ? 'block' : 'none',
      position: 'fixed',
      top: this.state.y,
      left: this.state.x
    }

    return (
      <PopupComponent
        style={style}
        previousExample={previousExample}
        hoveredExample={hoveredExample}
        nextExample={nextExample} />
    )
  }
}

export default connect(
  (state, ownProps) => {
    const {historyId, currentIndex} = state.popup
    const targetHistory = state.history.items.filter(h => h._id === historyId)[0]

    return {
      isFetching: state.history.isFetching,
      isShown: state.popup.isShown,
      previousExample: targetHistory ? targetHistory.examples[currentIndex - 1] : null,
      hoveredExample: targetHistory ? targetHistory.examples[currentIndex] : null,
      nextExample: targetHistory ? targetHistory.examples[currentIndex + 1] : null
    }
  }
)(PopupContainer)
