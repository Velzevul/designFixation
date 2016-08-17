import React from 'react'

import styles from './TaskDescription.css'
import Title from '../Title'
import Block from '../../layouts/Block'

const TaskDescription = () => {
  return (
    <div className={styles.TaskDescription}>
      <Block>
        <Title title="Design Task" />
      </Block>

      <div className={styles.TaskDescription__body}>
        A local planetarium asked you to help them with designing an advertisement for their new show. The show is to teach high school students basic astrophysics using science fiction.
      </div>
    </div>
  )
}

export default TaskDescription
