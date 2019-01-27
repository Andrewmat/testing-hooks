import React from 'react'
import classnames from 'classnames'
import Card from '../components/Card'
import Async from '../components/Async'
import useAsyncCache from '../hooks/useAsyncCache'
import useIterator from '../hooks/useIterator'
import useToggle from '../hooks/useToggle'
import { fetchPerson } from '../services/swService'
import range from '../utils/range'
import './Carousel.scss'

const CarouselExample = () => {
  const [isDarkMode, setDarkMode] = useToggle()
  const { previous, next, hasPrevious, hasNext, item } = useIterator(
    range(1, 10),
  )

  const fetchData = useAsyncCache(i => fetchPerson(i))

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
        key={item}
        promise={() => fetchData(item)}
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

export default CarouselExample
