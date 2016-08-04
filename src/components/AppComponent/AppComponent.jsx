import React from 'react'

import styles from './AppComponent.css'
import AppNameComponent from '../AppNameComponent'
import HistoriesContainer from '../HistoriesContainer'
import PopupContainer from '../PopupContainer'

const AppComponent = () => {
  return (
    <div className={styles.AppComponent}>
      <div className={styles.AppComponent__header}>
        <AppNameComponent />
      </div>

      <div className={styles.AppComponent__body}>
        <HistoriesContainer />
      </div>

      <PopupContainer />
    </div>
  )
}

export default AppComponent
