import React from 'react';
import Carousel from './components/Carousel';
import './App.scss';

const App = () => {
  return (
    <div>
      <Carousel>
        <div>primeiro slide</div>
        <div>segundo slide</div>
        <div>terceiro slide</div>
      </Carousel>
    </div>
  );
}

export default App;
