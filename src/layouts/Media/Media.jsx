import React from 'react'

const baseline = 0.750
import styles from './Media.css'

const MediaBody = ({
  content
}) => {
  return (
    <div className={styles.media__body}>
      {content}
    </div>
  )
}

const MediaFigure = ({
  n,
  content,
  reverse = false
}) => {
  let style = {}
  if (reverse) {
    style.marginLeft = `${baseline * n}rem`
  } else {
    style.marginRight = `${baseline * n}rem`
  }

  return (
    <div style={style} className={styles.media__figure}>
      {content}
    </div>
  )
}

const Media = ({
  figure,
  body,
  n = 1,
  reverse = false,
  alignItems = 'flex-start'
}) => {
  const style = {
    alignItems
  }

  const figureElement = (
    <MediaFigure
      content={figure}
      reverse={reverse}
      n={n} />
  )

  const bodyElement = (
    <MediaBody
      content={body} />
  )

  if (reverse) {
    return (
      <div style={style} className={styles.media}>
        {bodyElement}
        {figureElement}
      </div>
    )
  } else {
    return (
      <div style={style} className={styles.media}>
        {figureElement}
        {bodyElement}
      </div>
    )
  }
}

export default Media
