import React from 'react'

import styles from './LoadingComponent.css'
import Spinner from '../../UI/Spinner'
import Center from '../../Layouts/Center'

const LoadingComponent = () => {
  return (
    <div className={styles.LoadingComponent}>
      <Center>
        <Spinner />
      </Center>
    </div>
  )
}

export default LoadingComponent
