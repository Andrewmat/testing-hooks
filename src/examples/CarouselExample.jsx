import React from 'react'
import classnames from 'classnames'
import Card from '../components/Card'
import Async from '../components/Async'
import useCache from '../hooks/useCache'
import useIterator from '../hooks/useIterator'
import useToggle from '../hooks/useToggle'
import { getPerson } from '../services/swService'
import range from '../utils/range'
import './CarouselExample.scss'

export default function CarouselExample() {
  const [isDarkMode, setDarkMode] = useToggle()
  const { item, next, hasNext, previous, hasPrevious } = useIterator(
    range(1, 10),
    true,
  )
  const fetchData = useCache(getPerson, {
    key: item,
    namespace: 'swPerson',
  })

  return (
    <div
      className={classnames('carousel-example', {
        'carousel-example--dark': isDarkMode,
      })}
    >
      <div>
        <button type='button' onClick={setDarkMode}>
          {isDarkMode ? 'Return of the Jedi' : 'Join the Dark Side'}
        </button>
      </div>
      <button onClick={previous} disabled={!hasPrevious}>
        Previous
      </button>
      <Async
        promise={() => fetchData(item)}
        deps={[item]}
        placeholder={<div className='carousel-item'>Loading...</div>}
      >
        {(data, error) => (
          <div className='carousel-item'>
            {error ? (
              <span className='carousel-item__error'>
                Error: {error.message}
              </span>
            ) : (
              <Card data={data} />
            )}
          </div>
        )}
      </Async>
      <button onClick={next} disabled={!hasNext}>
        Next
      </button>
    </div>
  )
}
