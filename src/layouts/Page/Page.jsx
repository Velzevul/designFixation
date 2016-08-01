import React from 'react'

const Page = ({
  children
}) => {
  const style = {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  }

  return (
    <div style={style}>
      {children}
    </div>
  )
}

const PageContent = ({
  children
}) => {
  const style = {
    flex: '1'
  }

  return (
    <main style={style}>
      {children}
    </main>
  )
}

export {Page, PageContent}
