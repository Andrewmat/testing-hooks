import React from 'react';
import Carousel from '../components/Carousel';
import Async from '../components/Async';
import useToggle from '../hooks/useToggle';
import { fetchPerson } from '../services/swService';
import range from '../utils/range';
import './Carousel.scss';

const beforeButton = ({ setPrevious, isFirst }) => (
  <button onClick={setPrevious} disabled={isFirst}>Previous</button>
);

const afterButton = ({ setNext, isLast }) => (
  <button onClick={setNext} disabled={isLast}>Next</button>
);

const loading1 = <div className="carousel-item">...</div>
const loading2 = <div className="carousel-item">Loading</div>

export default () => {
  const [isAltPh, toggleAltPh] = useToggle();
  return (
    <div className="carousel-example">
      <button type="button" onClick={toggleAltPh}>Change Placeholder</button>
      <Carousel
        before={beforeButton}
        after={afterButton}
      >
        {
          range(10, 1).map(i => (
            <Async
              key={i}
              promise={() => fetchPerson(i)}
              placeholder={isAltPh ? loading1 : loading2}
            >
              {
                (data, error) => (
                  <div className="carousel-item">
                    {error ? (
                      <>
                        <span className="carousel-item__error">Error: {error.message}</span>
                      </>
                    ) : (
                      <>
                        <span className="carousel-item__title">{data.name}</span>
                        <div className="carousel-item__data">
                          <div>Eye color:</div>
                          <div>{data.eye_color}</div>
                        </div>
                        <div className="carousel-item__data">
                          <div>Skin color:</div>
                          <div>{data.skin_color}</div>
                        </div>
                        <div className="carousel-item__data">
                          <div>Hair color:</div>
                          <div>{data.hair_color}</div>
                        </div>
                        <div className="carousel-item__data">
                          <div>Height:</div>
                          <div>{data.height}cm</div>
                        </div>
                        <div className="carousel-item__data">
                          <div>Mass:</div>
                          <div>{data.mass}kg</div>
                        </div>
                      </>
                    )}
                  </div>
                )
              }
            </Async>
          ))
        }
      </Carousel>
    </div>
  );
}