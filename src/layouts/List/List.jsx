import React from 'react'

const baseline = 0.750
import styles from './List.css'

const List = ({
  n = 1,
  extraClassNames = '',
  children
}) => {
  const style = {
    marginBottom: `-${baseline * n}rem`
  }

  return (
    <ul style={style} className={`${styles.list} ${extraClassNames}`}>
      {children}
    </ul>
  )
}

const ListItem = ({
  n = 1,
  extraClassNames = '',
  children
}) => {
  const style = {
    marginBottom: `${baseline * n}rem`
  }

  return (
    <li style={style} className={`${styles.list__item} ${extraClassNames}`}>
      {children}
    </li>
  )
}

export {List, ListItem}
