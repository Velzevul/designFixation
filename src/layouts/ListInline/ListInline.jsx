import React from 'react'

const baseline = 0.750
import styles from './ListInline.css'

const ListItem = ({
  n = 1,
  item
}) => {
  const style = {
    marginBottom: `${baseline * n}rem`,
    marginLeft: `${baseline * n}rem`
  }

  return (
    <li style={style} className={styles.listInline__item}>
      {item}
    </li>
  )
}

const ListInline = ({
  n = 1,
  items,
  alignItems = 'center',
  justfyContent = 'flex-start'
}) => {
  const style = {
    marginBottom: `-${baseline * n}rem`,
    marginLeft: `-${baseline * n}rem`,
    alignItems,
    justfyContent
  }

  const listItems = items.map((i, index) =>
    <ListItem key={index} item={i} n={n} />
  )

  return (
    <ul style={style} className={styles.listInline}>
      {listItems}
    </ul>
  )
}

export default ListInline
