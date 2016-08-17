import React from 'react'
import {connect} from 'react-redux'

import styles from './QueryView.css'
import ExampleList from '../ExampleList'
import Block from '../../layouts/Block'
import Title from '../Title'

const QueryView = ({
  directExamples,
  relatedExamples
}) => {
  return (
    <div className={styles.QueryView}>
      <Block>
        <Block>
          <Title title="Colected by browsing search results" />
        </Block>

        <ExampleList
          compact
          examples={directExamples} />
      </Block>

      <Block>
        <Title title="Colected by browsing related images" />
      </Block>

      <ExampleList
        compact
        examples={relatedExamples} />
    </div>
  )
}

export default connect(
  state => {
    return {
      directExamples: state.data.examples
        .filter(e => state.ui.focusedQueries.indexOf(e.query) !== -1 && e.relevance > 0)
        .sort((a, b) => {
          if (a.query > b.query) {
            return 1
          } else if (a.query < b.query) {
            return -1
          } else {
            if (a.createdAt > b.createdAt) {
              return 1
            } else {
              return -1
            }
          }
        }),
      relatedExamples: state.data.examples
        .filter(e => state.ui.focusedQueries.indexOf(e.query) !== -1 && e.relevance === -1)
        .sort((a, b) => {
          if (a.query > b.query) {
            return 1
          } else if (a.query < b.query) {
            return -1
          } else {
            if (a.createdAt > b.createdAt) {
              return 1
            } else {
              return -1
            }
          }
        })
    }
  }
)(QueryView)
