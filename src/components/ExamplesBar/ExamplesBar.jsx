import React from 'react'
import {connect} from 'react-redux'

import styles from './ExamplesBar.css'
import ExamplesBarItem from '../ExamplesBarItem'
import {toggleFocusExampleGroup} from '../../store/uiActions'

const ExamplesBar = ({
  examples,
  query,
  page,
  label = '',
  focusedGroupPage,
  focusedGroupQuery,
  toggleFocusExampleGroup
}) => {
  let classNames = [styles.ExamplesBar]
  if (focusedGroupQuery) {
    if (focusedGroupQuery !== query || focusedGroupPage !== page) {
      classNames.push(styles.ExamplesBar_dimmed)
    }
  }

  return (
    <div
      onClick={toggleFocusExampleGroup}
      className={classNames.join(' ')}>
      {examples.map((e, index) =>
        <ExamplesBarItem
          key={index}
          example={e} />
      )}

      <div className={styles.ExamplesBar__label}>{label}</div>
    </div>
  )
}

export default connect(
  state => {
    return {
      focusedGroupPage: state.ui.focusedGroupPage,
      focusedGroupQuery: state.ui.focusedGroupQuery
    }
  },
  (dispatch, ownProps) => {
    return {
      toggleFocusExampleGroup: () => {
        dispatch(toggleFocusExampleGroup(ownProps.query, ownProps.page))
      }
    }
  }
)(ExamplesBar)
