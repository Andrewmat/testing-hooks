import React, { useState } from 'react';
import classnames from 'classnames';
import './App.scss';

const App = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const changeDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <div className={classnames('app', {
      'app--dark': isDarkMode,
    })}>
      <button onClick={changeDarkMode}>Set to {isDarkMode ? 'light' : 'dark'}</button>
    </div>
  );
}

export default App;
