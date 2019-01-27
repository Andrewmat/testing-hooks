import React from 'react';
import Carousel from '../components/Carousel';
import Async from '../components/Async';
import { fetchPerson } from '../services/swService';
import range from '../utils/range';
import './Carousel.scss';

const beforeButton = ({ setPrevious, isFirst }) => (
  <button onClick={setPrevious} disabled={isFirst}>Previous</button>
);

const afterButton = ({ setNext, isLast }) => (
  <button onClick={setNext} disabled={isLast}>Next</button>
);

export default () => (
  <div className="carousel-example">
    <Carousel
      before={beforeButton}
      after={afterButton}
    >
      {
        range(10, 1).map(i => (
          <Async
            key={i}
            promise={() => fetchPerson(i)}
            placeholder={<div className="carousel-item">Loading...</div>}
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
)