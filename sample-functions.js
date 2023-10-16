class Profile {
  stocks = [];

  isEmpty() {
    return this.stocks.length == 0;
  }

  purchase(name, amt) {
    let found_stock = this.findStock(name);
    
    if(found_stock != null) {
          found_stock.tickers += amt;
    } else {
      let stock = new Stock(name, amt);
      this.stocks.push(stock);
    }
  }

  findStock(name) {
    let found_stock = null;
    for(let stock_idx = 0; stock_idx < this.stocks.length; stock_idx++) {
      if(this.stocks[stock_idx].name == name) {
        found_stock = this.stocks[stock_idx];
        return found_stock;
      }
    }

    return null;
  }

  getStockAmt(name) {
    let found_stock = this.findStock(name);
    if(found_stock != null) return found_stock.tickers;
    return 0;
  }

  sell(name, amt) {
    let found_stock = this.findStock(name);
    
    if(found_stock != null) {
      found_stock.tickers -= amt;

      if(found_stock.tickers == 0) {
        this.stocks.splice(found_stock);
      } else if (found_stock.tickers < 0) {
        throw new Error("ShareSaleException");
      }
    }
  }
} 

class Stock {
  name = "";
  tickers = 0;

  constructor(name, ticks) {
    this.name = name;
    this.tickers = ticks;
  }
};

export default Profile;