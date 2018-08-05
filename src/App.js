import React, { Component } from 'react';
import './App.css';
import StockList from './stocks/StockList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Stock Balancer</h1>
        <StockList />
      </div>
    );
  }
}

export default App;
