import React from 'react'
import CacheProvider from './contexts/CacheProvider'
import CarouselExample from './examples/CarouselExample'
import './App.scss'

const App = () => {
  return (
    <div>
      <CacheProvider>
        <CarouselExample />
      </CacheProvider>
    </div>
  )
}

export default App
