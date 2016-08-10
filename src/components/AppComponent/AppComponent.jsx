import React from 'react'

import styles from './AppComponent.css'
import AppNameComponent from '../AppNameComponent'
import HistoriesContainer from '../HistoriesContainer'
import SummaryContainer from '../SummaryContainer'

const AppComponent = () => {
  return (
    <div className={styles.AppComponent}>
      <div className={styles.AppComponent__header}>
        <AppNameComponent />
      </div>

      <div className={styles.AppComponent__summary}>
        <SummaryContainer />
      </div>

      <div className={styles.AppComponent__history}>
        <HistoriesContainer />
      </div>
    </div>
  )
}

export default AppComponent
