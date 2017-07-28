import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './Quiz';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h2>Welcome to the Addition Game</h2>
        </div>
        <Quiz />
      </div>
    );
  }
}

export default App;
