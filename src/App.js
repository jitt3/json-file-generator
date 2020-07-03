import React from 'react';
import logo from './logo.svg';
import './App.css';
import CsvParser from "./components/CsvParser";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        <CsvParser/>
        </a>
      </header>
    </div>
  );
}

export default App;
