import React from 'react'

import styles from './HistoryDetailsComponent.css'

const IMAGE_WIDTH = 200

class HistoryDetailsComponent extends React.Component {
  componentDidMount () {
    const {focus} = this.props

    this._el.scrollLeft = focus * (IMAGE_WIDTH) - (window.innerWidth - IMAGE_WIDTH) / 2
  }

  componentWillReceiveProps (newProps) {
    const {focus} = newProps

    if (focus !== this.props.focus) {
      this._el.scrollLeft = focus * (IMAGE_WIDTH) - (window.innerWidth - IMAGE_WIDTH) / 2
    }
  }

  render () {
    const {examples} = this.props

    const wrapperStyle = {
      width: (IMAGE_WIDTH) * examples.length
    }

    const exampleElements = examples.map((e, index) => {
      let classNames = [styles.HistoryDetailsComponent__image]

      if (e.isCollected) {
        classNames.push(styles.HistoryDetailsComponent__image_is_collected)
      }

      return (
        <a
          target="_blank"
          href={`https://www.pinterest.com/pin/${e.id}`}
          key={index}
          className={styles.HistoryDetailsComponent__imgWrapper}>
          <img
            src={e.url}
            className={classNames.join(' ')} />
        </a>
      )
    })

    return (
      <div
        className={styles.HistoryDetailsComponent}
        ref={el => { this._el = el }}>
        <div
          style={wrapperStyle}
          className={styles.HistoryDetailsComponent__wrapper}>
          {exampleElements}
        </div>
      </div>
    )
  }
}

export default HistoryDetailsComponent
