import React from 'react'

const Wrap = ({
  width = '90%',
  maxWidth = '80rem', // 1280px provided 1em === 16px
  extraClassNames = '',
  children
}) => {
  const style = {
    width,
    maxWidth,
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  return (
    <div style={style} className={extraClassNames}>
      {children}
    </div>
  )
}

export default Wrap
