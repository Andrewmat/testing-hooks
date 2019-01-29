import React from 'react'
import classnames from 'classnames'
import Card from '../components/Card'
import Async from '../components/Async'
import Carousel from '../components/Carousel'
import useCache from '../hooks/useCache'
import useToggle from '../hooks/useToggle'
import { fetchPerson } from '../services/swService'
import range from '../utils/range'
import './CarouselExample.scss'

export default function CarouselExample() {
  const [isDarkMode, setDarkMode] = useToggle()
  const fetchData = useCache(i => fetchPerson(i), { asynchronous: true })

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
      <Carousel
        loop
        before={({ isFirst, previous }) => (
          <button onClick={previous} disabled={isFirst}>
            Previous
          </button>
        )}
        after={({ isLast, next }) => (
          <button onClick={next} disabled={isLast}>
            Next
          </button>
        )}
      >
        {range(1, 10).map(i => (
          <Async
            key={i}
            promise={() => fetchData(i)}
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
        ))}
      </Carousel>
    </div>
  )
}
