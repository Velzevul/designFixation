import React from 'react'

import styles from './Section.css'
import Block from '../../layouts/Block'
import Pin from '../Pin'

const Section = ({
  title,
  query,
  pins
}) => {
  return (
    <div className={styles.Section}>
      <SectionHeader title={title} query={query} />

      <SectionBody pins={pins} />
    </div>
  )
}

const SectionHeader = ({
  title,
  query
}) => {
  return (
    <div className={styles.SectionHeader}>
      <Block n={0.5}>
        <div className={styles.SectionHeader__title}>{title}</div>
      </Block>

      <div className={styles.SectionHeader__query}>{query}</div>
    </div>
  )
}

const SectionBody = ({
  pins = []
}) => {
  console.log(pins)
  let pinColumns = []
  for (let i = 0; i < 4; i++) {
    let column = pins.filter((pin, index) => {
      return index % 4 === i
    })
    pinColumns.push(column)
  }

  const content = pinColumns.map((col, colIndex) =>
    <div className={styles.SectionBody__column} key={colIndex}>
      {col.map((p, pIndex) =>
        <Block n={1.5} key={pIndex}>
          <Pin pin={p} />
        </Block>
      )}
    </div>
  )

  return (
    <div className={styles.SectionBody}>
      {content}
    </div>
  )
}

export default Section
