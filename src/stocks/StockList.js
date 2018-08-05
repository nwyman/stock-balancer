import React, { Component } from 'react';

class StockList extends Component {
  constructor(props) {
    super(props);

    const storageStocks = window.localStorage.getItem("stocks");

    this.state = storageStocks ? 
      {
        ...JSON.parse(storageStocks),
        stocksBalanced: false
      } : 
      {
        stocksBalanced: false,
        totalValue: 0,
        stocks: [{stockName: '', price: '', currentQuantity: '', desiredPercentage: '', balance: 0}]
      };
  }

  addStock() {
    this.setState({
      ...this.state,
      stocks: [
        ...this.state.stocks,
        {stockName: '', price: '', currentQuantity: '', desiredPercentage: '', balance: 0}
      ]
    });
  }

  balanceStocks() {
    const newState= {
      ...this.state,
      stocksBalanced: true
    };

    const totalValue = newState.totalValue;

    newState.stocks = newState.stocks.map((stock) => {
      return {
        ...stock,
        balance: Math.floor(((totalValue * (stock.desiredPercentage / 100)) / stock.price)) - Math.floor(stock.currentQuantity)
      }
    });

    this.setState(newState);
  }

  saveStocks() {
    let stockString = JSON.stringify(this.state);

    window.localStorage.setItem("stocks", stockString);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.id;
    const splitArray = name.split('.');

    const newState = {...this.state};

    if (splitArray.length === 1) {
      newState[splitArray[0]] = target.value;
    }
    else {
      let stateContext = newState[splitArray[0]];

      for(let i = 1; i < splitArray.length - 1; i++) {
        stateContext = stateContext[splitArray[i]];
      }

      stateContext[splitArray[splitArray.length - 1]] = target.value;
    }

    this.setState(newState);
  }

  render() {
    return (<div>
      <h3>Add your stocks and desired Percentage.</h3>

      <label htmlFor='totalValue'>Current Total Value</label><input id='totalValue' value={this.state.totalValue} onChange={(event) => this.handleInputChange(event)}/>

      {this.state.stocks.map((stock, index) => {
        let balance = this.state.stocksBalanced ? (<span>Balance {stock.balance} {stock.balance > 0 ? "UP": "DOWN"}</span>) : ""

        return (<div key={index}>
          <label htmlFor={'stocks.' + index + '.stockName'}>Stock Name</label>&nbsp;<input id={'stocks.' + index + '.stockName'} value={stock.stockName} onChange={(event) => this.handleInputChange(event)}/>&nbsp;
          <label htmlFor={'stocks.' + index + '.price'}>Current Price</label>&nbsp;<input id={'stocks.' + index + '.price'} value={stock.price} onChange={(event) => this.handleInputChange(event)}/>&nbsp;
          <label htmlFor={'stocks.' + index + '.currentQuantity'}>Current Quantity</label>&nbsp;<input id={'stocks.' + index + '.currentQuantity'} value={stock.currentQuantity} onChange={(event) => this.handleInputChange(event)}/>&nbsp;
          <label htmlFor={'stocks.' + index + '.desiredPercentage'}>Desired Percentage</label>&nbsp;<input id={'stocks.' + index + '.desiredPercentage'} value={stock.desiredPercentage} onChange={(event) => this.handleInputChange(event)}/>&nbsp;

          {balance}
        </div>);
      })}

      <button type='button' onClick={() => this.addStock()}>Add Stock</button>
      <button type='button' onClick={() => this.balanceStocks()}>Balance Stocks</button>
      <button type='button' onClick={() => this.saveStocks()}>Save</button>
    </div>);
  }
}

export default StockList;