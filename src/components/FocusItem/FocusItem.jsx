import React from 'react'

import styles from './FocusItem.css'
import FlowItem from '../FlowItem'
import Block from '../../layouts/Block'

const FocusItem = ({
  item
}) => {
  const history = (
    <div className={styles.FocusHistory}>
      <Block>
        <div className={styles.FocusHistory__type}>{item.text}</div>
      </Block>

      <div className={styles.FocusHistory__image}>
        <img src={item.imageUrl} />
      </div>
    </div>
  )

  return (
    <FlowItem left={history} />
  )
}

export default FocusItem
