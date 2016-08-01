import React from 'react'

const baseline = 0.750

const Grid = ({
  gutter = 0,
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  extraClassNames = '',
  children
}) => {
  const style = {
    height: '100%',
    display: 'flex',
    alignItems,
    justifyContent,
    marginLeft: `-${baseline * gutter / 2}rem`,
    marginRight: `-${baseline * gutter / 2}rem`
  }

  return (
    <div style={style} className={extraClassNames}>
      {children}
    </div>
  )
}

const GridItem = ({
  span = 0,
  outOf = 12,
  gutter = 0,
  extraClassNames = '',
  children
}) => {
  let style = {
    paddingLeft: `${baseline * gutter / 2}rem`,
    paddingRight: `${baseline * gutter / 2}rem`,
    flex: '1'
  }

  if (span && outOf) {
    style = Object.assign({}, style, {
      flex: '0 0 auto',
      width: `${100 * span / outOf}%`
    })
  }

  return (
    <div style={style} className={extraClassNames}>
      {children}
    </div>
  )
}

export {Grid, GridItem}
