import React from 'react';
import './App.css';
import Sine from './Sine';


function App() {
  return (
    <div className="App">
      <div className="App-info">
        <p>Sine visualization using svg and React Hooks</p>
        <p>
          Forked from <a href="https://codepen.io/HunorMarton/pen/ggQGqQ" target="_blank">codepen.io/HunorMarton/pen/ggQGqQ</a>
          <br/>
          Replaced class components using function and Hooks
        </p>
        <p>by Contra <a href="https://www.floatbug.com" target="_blank">floatbug.com</a></p>
      </div>
      <Sine />
    </div>
  );
}

export default App;
