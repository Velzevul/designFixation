import React from 'react'

const baseline = 0.750
import styles from './Spinner.css'

const Spinner = ({
  width = 5,
  height = 5
}) => {
  const style = {
    width: `${baseline * width}rem`,
    height: `${baseline * height}rem`
  }

  return (
    <div style={style} className={styles.Spinner}>
      <div className={`${styles.Spinner__circle} ${styles.Spinner__circle1}`}></div>
      <div className={`${styles.Spinner__circle} ${styles.Spinner__circle2}`}></div>
      <div className={`${styles.Spinner__circle} ${styles.Spinner__circle3}`}></div>
      <div className={`${styles.Spinner__circle} ${styles.Spinner__circle4}`}></div>
      <div className={`${styles.Spinner__circle} ${styles.Spinner__circle5}`}></div>
      <div className={`${styles.Spinner__circle} ${styles.Spinner__circle6}`}></div>
      <div className={`${styles.Spinner__circle} ${styles.Spinner__circle7}`}></div>
      <div className={`${styles.Spinner__circle} ${styles.Spinner__circle8}`}></div>
      <div className={`${styles.Spinner__circle} ${styles.Spinner__circle9}`}></div>
      <div className={`${styles.Spinner__circle} ${styles.Spinner__circle10}`}></div>
      <div className={`${styles.Spinner__circle} ${styles.Spinner__circle11}`}></div>
      <div className={`${styles.Spinner__circle} ${styles.Spinner__circle12}`}></div>
    </div>
  )
}

export default Spinner
