import React from 'react'
import classnames from 'classnames'
import { useToggle, CacheProvider } from '@andrewmat/hooks'
import CardIterator from './components/CardIterator'
import github from './github.png'
import './App.scss'

console.log(useToggle.toString())

function App() {
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
      <div className='github-link'>
        Check it on{' '}
        <a
          href='https://github.com/Andrewmat/testing-hooks'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={github} alt='Github logo' />
          <span>Github</span>
        </a>
      </div>
    </div>
  )
}

export default App
