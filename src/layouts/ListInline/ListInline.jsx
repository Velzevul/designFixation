import React from 'react'

const baseline = 0.750
import styles from './ListInline.css'

const ListInline = ({
  n = 1,
  extraClassNames = '',
  children,
  alignItems = 'center',
  justfyContent = 'flex-start'
}) => {
  const style = {
    marginBottom: `-${baseline * n}rem`,
    marginLeft: `-${baseline * n}rem`,
    alignItems,
    justfyContent
  }

  return (
    <ul style={style} className={`${styles.listInline} ${extraClassNames}`}>
      {children}
    </ul>
  )
}

const ListInlineItem = ({
  n = 1,
  extraClassNames = '',
  children
}) => {
  const style = {
    marginBottom: `${baseline * n}rem`,
    marginLeft: `${baseline * n}rem`
  }

  return (
    <li style={style} className={`${styles.listInline__item} ${extraClassNames}`}>
      {children}
    </li>
  )
}

export {ListInline, ListInlineItem}
