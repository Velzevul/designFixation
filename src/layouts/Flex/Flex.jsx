import React from 'react'

const Flex = ({
  justifyContent = 'flex-start',
  alignItems = 'center',
  extraClassNames = '',
  flexDirection = 'row',
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
    <div style={style} className={extraClassNames}>
      {children}
    </div>
  )
}

export default Flex
