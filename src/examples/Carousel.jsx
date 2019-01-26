import React from 'react';
import Carousel from '../components/Carousel';
import Async from '../components/Async';
import { fetchPerson } from '../services/swService';
import './Carousel.scss';

const beforeButton = ({ setPreviousSlide }) => (
  <button onClick={setPreviousSlide}>Previous</button>
);

const afterButton = ({ setNextSlide }) => (
  <button onClick={setNextSlide}>Next</button>
);

export default () => (
  <div className="carousel-example">
    <Carousel
      before={beforeButton}
      after={afterButton}
    >
      {
        [1,2,3,4,5,6,7,8,9,10].map(i => (
          <Async promise={async () => fetchPerson(i)} placeholder={<div>Loading...</div>} key={i}>
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