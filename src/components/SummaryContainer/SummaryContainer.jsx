import React from 'react'

import styles from './SummaryContainer.css'

import Media from '../../layouts/Media'
import Block from '../../layouts/Block'
import {Grid, GridItem} from '../../layouts/Grid'

const SummaryContainer = () => {
  return (
    <div className={styles.SummaryContainer}>
      <Block>
        <Media
          alignItems="center"
          figure={<div className={styles.SummaryContainer__count}>3/30</div>}
          body={<div className={styles.SummaryContainer__text}>successful search ideas</div>} />
      </Block>

      <Media
        alignItems="center"
        figure={<div className={styles.SummaryContainer__count}>15/150</div>}
        body={<div className={styles.SummaryContainer__text}>examples collected</div>} />
    </div>
  )
}

export default SummaryContainer
