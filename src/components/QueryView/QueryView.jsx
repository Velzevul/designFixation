import React from 'react'
import {connect} from 'react-redux'

import styles from './QueryView.css'
import ExampleList from '../ExampleList'
import KeywordExampleList from '../KeywordExampleList'
import Block from '../../layouts/Block'
import Title from '../Title'

const QueryView = ({
  directExamples,
  relatedExamples,
  focusedKeywords
}) => {
  const focusedKeywordsRegexp = new RegExp(`(${focusedKeywords.join('|')})`)

  const nonKeywordDirectExamples = directExamples.filter(e => !focusedKeywords.length || !focusedKeywordsRegexp.test(e.imageDescription))
  let directExamplesEl = ''
  if (nonKeywordDirectExamples.length) {
    directExamplesEl = (
      <ExampleList
        nCols={8}
        examples={nonKeywordDirectExamples} />
    )
  }

  const nonKeywordRelatedExamples = relatedExamples.filter(e => !focusedKeywords.length || !focusedKeywordsRegexp.test(e.imageDescription))
  let relatedExamplesEl = ''
  if (nonKeywordDirectExamples.length) {
    relatedExamplesEl = (
      <ExampleList
        nCols={8}
        examples={nonKeywordRelatedExamples} />
    )
  }

  return (
    <div className={styles.QueryView}>
      <Block>
        <Block>
          <Title title="Colected by browsing search results" />
        </Block>

        {focusedKeywords.map((k, index) =>
          <KeywordExampleList
            key={index}
            keyword={k}
            examples={directExamples} />
        )}

        {directExamplesEl}
      </Block>

      <Block>
        <Title title="Colected by browsing related images" />
      </Block>

      {focusedKeywords.map((k, index) =>
        <KeywordExampleList
          key={index}
          keyword={k}
          examples={relatedExamples} />
      )}

      {relatedExamplesEl}
    </div>
  )
}

export default connect(
  state => {
    const examples = state.data.examples.filter(e => {
      return state.ui.focusedQueries.indexOf(e.query) !== -1
    })

    return {
      focusedKeywords: state.ui.focusedKeywords,
      directExamples: examples
        .filter(e => e.relevance > 0)
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
      relatedExamples: examples
        .filter(e => e.relevance === -1)
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
