import React from 'react'

import styles from './HistoryComponent.css'
import ImageQueryComponent from '../ImageQueryComponent'
import KeywordQueryComponent from '../KeywordQueryComponent'
import ExampleContainer from '../ExampleContainer'
import ListInline from '../../layouts/ListInline'
import Block from '../../layouts/Block'

const HistoryComponent = ({
  item
}) => {
  let itemQuery = ''
  if (item.query) {
    itemQuery = (
      <KeywordQueryComponent keyword={item.query} />
    )
  } else if (item.image) {
    itemQuery = (
      <ImageQueryComponent image={item.image} />
    )
  }

  const itemExamples = item.examples.map((e, index) =>
    <ExampleContainer example={e} index={index} historyId={item._id} />
  )

  return (
    <div className={styles.HistoryComponent}>
      <Block n={1}>
        <div className={styles.HistoryComponent__query}>
          {itemQuery}
        </div>
      </Block>

      <div className={styles.HistoryComponent__history}>
        <ListInline n={0.083} items={itemExamples} />
      </div>
    </div>
  )
}

export default HistoryComponent
