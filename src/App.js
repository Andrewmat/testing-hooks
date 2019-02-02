import React from 'react'
import classnames from 'classnames'
import CacheProvider from './components/CacheProvider'
import CardIterator from './components/CardIterator'
import useToggle from './hooks/useToggle'
import './App.scss'

const App = () => {
  const [darkMode, setDarkMode] = useToggle()
  return (
    <div className='app-root'>
      <button
        className={classnames({
          'dark-mode-btn': true,
          'is-dark': darkMode,
        })}
        type='button'
        onClick={setDarkMode}
      >
        {darkMode ? 'Return of the Jedi' : 'Join the Dark Side'}
      </button>
      <CacheProvider>
        <CardIterator darkMode={darkMode} />
      </CacheProvider>
    </div>
  )
}

export default App
