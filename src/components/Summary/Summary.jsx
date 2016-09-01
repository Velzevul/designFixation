import React from 'react'
import {connect} from 'react-redux'

import styles from './Summary.css'
import Media from '../../layouts/Media'
import Flex from '../../layouts/Flex'
import ExamplesBar from '../ExamplesBar'
import Block from '../../layouts/Block'

const Summary = ({
  queriesCount,
  examples
}) => {
  let searchResultsChartData = [
    {
      label: '10+',
      page: 10,
      examples: examples.filter(e => e.relevance === 10)
    }
  ]
  for (let i = 9; i > 0; i--) {
    searchResultsChartData = [
      {
        label: `${i}`,
        page: i,
        examples: examples.filter(e => e.relevance === i)
      },
      ...searchResultsChartData
    ]
  }

  const searchResultsChart = (
    <div className={styles.sChart}>
      <div className={styles.sChart__title}>Search Result Pages</div>

      <Block n={0.5}>
        <div className={styles.sChart__canvas}>
          {searchResultsChartData.map((s, index) =>
            <ExamplesBar
              key={index}
              query={null}
              page={s.page}
              label={s.label}
              examples={examples.filter(e => e.relevance === s.page)} />
          )}
        </div>
      </Block>
    </div>
  )

  const relatedImagesChart = (
    <div className={styles.sChart}>
      <div className={styles.sChart__title}>Related Images</div>

      <Block n={0.5}>
        <div className={styles.sChart__canvas}>
          <ExamplesBar
            query={null}
            page={-1}
            theme="accent2"
            examples={examples.filter(e => e.relevance === -1)} />
        </div>
      </Block>
    </div>
  )

  return (
    <div className={styles.Summary}>
      <div className={styles.Summary__header}>
        <Flex
          alignItems="center"
          justifyContent="center">
          <div className={styles.sHeader}>
            <Media
              alignItems="center"
              figure={<div className={styles.sHeader__counter}>{queriesCount}</div>}
              body={<div className={styles.sHeader__body}>search queries</div>} />
          </div>
          <div className={styles.sHeader}>
            <Media
              alignItems="center"
              figure={<div className={styles.sHeader__counter}>{examples.length}</div>}
              body={<div className={styles.sHeader__body}>examples collected</div>} />
          </div>
        </Flex>
      </div>

      <div className={styles.Summary__body}>
        <Media
          alignItems="stretch"
          figure={searchResultsChart}
          body={relatedImagesChart} />
      </div>
    </div>
  )
}

export default connect(
  state => {
    return {
      queriesCount: state.data.queries.length,
      examples: state.data.examples
    }
  }
)(Summary)
