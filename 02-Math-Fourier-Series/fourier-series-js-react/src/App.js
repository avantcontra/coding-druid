import React from 'react';
import './App.css';
import Fourier from './Fourier';


function App() {
  return (
    <div className="App">
      <div className="App-info">
        <p>Fourier series visualization using svg and React Hooks</p>
        
        <p>by Contra <a href="https://www.floatbug.com" target="_blank">floatbug.com</a></p>
      </div>
      <Fourier />
    </div>
  );
}

export default App;

