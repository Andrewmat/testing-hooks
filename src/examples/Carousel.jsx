import React from "react"
import Carousel from "../components/Carousel"
import Card from "../components/Card"
import Async from "../components/Async"
import useToggle from "../hooks/useToggle"
import { fetchPerson } from "../services/swService"
import range from "../utils/range"
import "./Carousel.scss"

const beforeButton = ({ setPrevious, isFirst }) => (
  <button onClick={setPrevious} disabled={isFirst}>
    Previous
  </button>
)

const afterButton = ({ setNext, isLast }) => (
  <button onClick={setNext} disabled={isLast}>
    Next
  </button>
)

const loading1 = <div className='carousel-item'>...</div>
const loading2 = <div className='carousel-item'>Loading</div>

export default () => {
  const [isAltPh, toggleAltPh] = useToggle()
  return (
    <div className='carousel-example'>
      <button type='button' onClick={toggleAltPh}>
        Change Placeholder
      </button>
      <Carousel before={beforeButton} after={afterButton}>
        {range(10, 1).map(i => (
          <Async
            key={i}
            promise={() => fetchPerson(i)}
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
        ))}
      </Carousel>
    </div>
  )
}
