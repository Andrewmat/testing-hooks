import React from 'react'
import Card from '../components/Card'
import Async from '../components/Async'
import useToggle from '../hooks/useToggle'
import { fetchPerson } from '../services/swService'
import range from '../utils/range'
import './Carousel.scss'
import useIterator from '../hooks/useIterator'
import useAsyncCache from '../hooks/useAsyncCache'

const loading1 = <div className='carousel-item'>...</div>
const loading2 = <div className='carousel-item'>Loading</div>

const CarouselExample = () => {
  const [isAltPh, toggleAltPh] = useToggle()
  const { previous, next, hasPrevious, hasNext, item } = useIterator(
    range(10, 1),
  )

  const promise = useAsyncCache(i => fetchPerson(i))

  return (
    <div className='carousel-example'>
      <button onClick={previous} disabled={!hasPrevious}>
        Previous
      </button>
      <button type='button' onClick={toggleAltPh}>
        Change Placeholder
      </button>
      <Async
        key={item}
        promise={() => promise(item)}
        placeholder={isAltPh ? loading1 : loading2}
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
