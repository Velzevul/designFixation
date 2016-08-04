import React from 'react'

import Flex from '../Flex'

const Center = ({
  children
}) => {
  return (
    <Flex alignItems="center" justifyContent="center">
      {children}
    </Flex>
  )
}

export default Center
