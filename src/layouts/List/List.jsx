import React from 'react'

const baseline = 0.750
import styles from './List.css'

const ListItem = ({
  n = 1,
  item
}) => {
  const style = {
    marginBottom: `${baseline * n}rem`
  }

  return (
    <li style={style} className={styles.list__item}>
      {item}
    </li>
  )
}

const List = ({
  items,
  n = 1,
  alignItems = 'flex-start',
  justifyContent = 'flex-start'
}) => {
  const style = {
    marginBottom: `-${baseline * n}rem`,
    alignItems,
    justifyContent
  }

  const listItems = items.map((i, index) =>
    <ListItem key={index} item={i} n={n} />
  )

  return (
    <ul style={style} className={styles.list}>
      {listItems}
    </ul>
  )
}

export default List
