import React from 'react'

const Flex = ({
  flexDirection = 'row',
  justifyContent = 'flex-start',
  alignItems = 'center',
  children
}) => {
  const style = {
    flexDirection,
    alignItems,
    justifyContent,
    display: 'flex',
    width: '100%',
    height: '100%'
  }

  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default Flex
