import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { useState } from 'react';

function App() {
  const getValFromHeader = (val) => {
    console.log("val", val)
  }

  return (
    <div className="App">
      <Home valFunc={getValFromHeader} />
    </div>
  );
}

export default App;
