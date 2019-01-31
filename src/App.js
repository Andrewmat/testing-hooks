import React from 'react'
import CacheProvider from './components/CacheProvider'
import CardIteration from './examples/CardIteration'
import './App.scss'

const App = () => {
  return (
    <div>
      <CacheProvider>
        <CardIteration />
      </CacheProvider>
    </div>
  )
}

export default App
