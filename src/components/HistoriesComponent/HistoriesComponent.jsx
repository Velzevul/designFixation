import React from 'react'

import styles from './HistoriesComponent.css'
import HistoryComponent from '../HistoryComponent'
import List from '../../layouts/List'

const HistoriesComponent = ({
  items
}) => {
  const historyItems = items.map((i, index) =>
    <div className={styles.HistoriesComponent__item}>
      <HistoryComponent item={i} />
    </div>
  )

  return (
    <div className={styles.HistoriesComponent}>
      <List
        alignItems="stretch"
        n={2}
        items={historyItems} />
    </div>
  )
}

export default HistoriesComponent
