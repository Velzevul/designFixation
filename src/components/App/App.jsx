import React from 'react'

import styles from './App.css'
import img from './img.jpg'

const App = () => {
  return (
    <div className={styles.App}>
      App here

      <div>
        <img src={img} />
      </div>
    </div>
  )
}

export default App
