import React from 'react';
import Carousel from './components/Carousel';
import './App.scss';

const PreviousButton = ({ setPreviousSlide }) => (
  <button onClick={setPreviousSlide}>Anterior</button>
);

const NextButton = ({ setNextSlide }) => (
  <button onClick={setNextSlide}>Próximo</button>
);

const App = () => {
  return (
    <div>
      <Carousel before={PreviousButton} after={NextButton}>
        {
          [1,2,3].map(i => (
            <img src={`https://picsum.photos/400/250?image=${i*5 + 4}`} alt={`slide ${i}`} key={i} />
          ))
        }
      </Carousel>
    </div>
  );
}

export default App;
