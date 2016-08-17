import React from 'react'
import {connect} from 'react-redux'

import styles from './Example.css'

const Example = ({
  example,
  compact,
  color,
  focusedQueries
}) => {
  let style = {}
  let classNames = [styles.Example]
  if (compact) {
    classNames.push(styles.Example_compact)
  }
  if (focusedQueries.length > 1) {
    style.backgroundColor = `rgba(${color.slice(4, color.length - 1)}, 0.3)`
  }

  return (
    <div
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
      color: state.data.queries.filter(q => q.query === ownProps.example.query)[0].color
    }
  }
)(Example)
