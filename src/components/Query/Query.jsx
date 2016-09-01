import React from 'react'
import {connect} from 'react-redux'

import styles from './Query.css'
import Media from '../../layouts/Media'
import Flex from '../../layouts/Flex'
import ExamplesBar from '../ExamplesBar'

const Query = ({
  query,
  examples
}) => {
  let searchResultsChartData = [
    {
      label: '10+',
      page: 10,
      examples: examples.filter(e => e.relevance >= 10)
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
    <div className={styles.qChart}>
      <div className={styles.qChart__title}>Search Result Pages</div>

      <div className={styles.qChart__canvas}>
        {searchResultsChartData.map((s, index) =>
          <ExamplesBar
            key={index}
            query={query.query}
            page={s.page}
            label={s.label}
            examples={examples.filter(e => e.relevance === s.page)} />
        )}
      </div>
    </div>
  )

  const relatedImagesChart = (
    <div className={styles.qChart}>
      <div className={styles.qChart__title}>Related Images</div>

      <div className={styles.qChart__canvas}>
        <ExamplesBar
          query={query.query}
          page={-1}
          theme="accent2"
          examples={examples.filter(e => e.relevance === -1)} />
      </div>
    </div>
  )

  return (
    <div className={styles.Query}>
      <div className={styles.Query__header}>
        <div className={styles.qHeader}>
          <Flex
            alignItems="center"
            justifyContent="space-between">
            <div className={styles.qHeader__query}>{query.query}</div>

            <div className={styles.qHeader__examplesCount}>{query.examplesCount} example(s)</div>
          </Flex>
        </div>
      </div>

      <div className={styles.Query__body}>
        <Media
          alignItems="stretch"
          figure={searchResultsChart}
          body={relatedImagesChart} />
      </div>
    </div>
  )
}

export default connect(
  (state, ownProps) => {
    return {
      examples: state.data.examples.filter(e => e.query === ownProps.query.query)
    }
  }
)(Query)
