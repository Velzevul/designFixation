import React from 'react'
import {connect} from 'react-redux'

import styles from './TaskDescription.css'
import Title from '../Title'
import Block from '../../layouts/Block'

const TaskDescription = ({
  task,
  focusedQueries
}) => {
  const queryTasks = focusedQueries.map((q, i) => {
    let matchedTask = q.matchedTask

    if (matchedTask) {
      while (matchedTask.indexOf('<em>') !== -1) {
        const insertPosition = matchedTask.indexOf('<em>') + 3
        const queryColor = `rgba(${q.color.slice(4, q.color.length - 1)}, 0.3)`
        matchedTask = `${matchedTask.slice(0, insertPosition)} style="background-color: ${queryColor};" ${matchedTask.slice(insertPosition)}`
      }

      return (
        <div
          key={i}
          className={styles.TaskDescription__query}
          dangerouslySetInnerHTML={{__html: matchedTask}} />
      )
    } else {
      return ''
    }
  })

  return (
    <div className={styles.TaskDescription}>
      <Block>
        <Title title="Design Task" />
      </Block>

      <div className={styles.TaskDescription__body}>
        <div className={styles.TaskDescription__main}>
          {task.text}
        </div>

        {queryTasks}
      </div>
    </div>
  )
}

export default connect(
  state => {
    return {
      task: state.data.task,
      focusedQueries: state.data.queries.filter(q => state.ui.focusedQueries.indexOf(q.query) !== -1)
    }
  }
)(TaskDescription)
