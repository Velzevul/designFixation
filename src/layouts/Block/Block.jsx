import React from 'react'

const baseline = 0.750

const Block = ({
  n = 1,
  extraClassNames = '',
  children
}) => {
  const style = {
    marginBottom: `${baseline * n}rem`
  }

  return (
    <div style={style} className={extraClassNames}>
      {children}
    </div>
  )
}

export default Block
