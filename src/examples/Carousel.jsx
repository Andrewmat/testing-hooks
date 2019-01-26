import React from 'react';
import Carousel from '../components/Carousel';

const beforeButton = ({ setPreviousSlide }) => (
  <button onClick={setPreviousSlide}>Previous</button>
);

const afterButton = ({ setNextSlide }) => (
  <button onClick={setNextSlide}>Next</button>
);

export default () => (
  <Carousel
    loop
    before={beforeButton}
    after={afterButton}
  >

    {
      [1,2,3].map(i => (
        <img src={`https://picsum.photos/400/250?image=${i * 8 + 3}`} alt={`slide ${i}`} key={i} />
      ))
    }
  </Carousel>
)