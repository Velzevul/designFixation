import React from 'react'

import styles from './BackItem.css'
import FlowItem from '../FlowItem'
import Block from '../../layouts/Block'

const BackItem = ({
  item,
  backPoint
}) => {
  const history = (
    <div className={styles.BackHistory}>
      <Block>
        <div className={styles.BackHistory__type}>{item.text} {backPoint.text}</div>
      </Block>

      <div className={styles.BackHistory__query}>"{backPoint.query}"</div>
    </div>
  )

  return (
    <FlowItem left={history} />
  )
}

export default BackItem
