import React from 'react'

import styles from './ExampleList.css'
import Example from '../Example'

class ExampleList extends React.Component {
  render () {
    const {examples, nCols} = this.props
    const columns = []

    for (let i = 0; i < nCols; i++) {
      const column = examples.filter((e, index) => {
        return index % nCols === i
      })

      columns.push(column)
    }

    let classNames = [styles.ExampleList]

    return (
      <div className={classNames.join(' ')}>
        {columns.map((column, i) =>
          <div
            key={i}
            className={styles.ExampleList__column}>
            {column.map((example, j) =>
              <div
                key={j}
                className={styles.ExampleList__example}>
                <Example
                  compact={nCols > 5}
                  example={example} />
              </div>
            )}</div>
        )}
      </div>
    )
  }
}

export default ExampleList
