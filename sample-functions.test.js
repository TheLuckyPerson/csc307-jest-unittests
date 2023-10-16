import Profile from "./sample-functions.js";
import Stock from "./sample-functions.js";

let profile;

beforeEach(() => {
  profile = new Profile();
});

test("No Shares", () => {
  expect(profile.isEmpty()).toBeTruthy();
});


test("Has 2 shares", () => {
  profile.stocks.push(new Stock("GME", 2));
  profile.stocks.push(new Stock("RBLX", 2));

  expect(profile.stocks.length).toBe(2);
});

test("Make a purchase", () => {
  profile.purchase("GME", 5)
  expect(profile.stocks[0].tickers).toBe(5);

  profile.purchase("GME", 2)
  expect(profile.stocks[0].tickers).toBe(7);
});

test("Make a sale", () => {
  profile.purchase("GME", 6)
  profile.sell("GME", 5)
  expect(profile.stocks[0].tickers).toBe(1);
});

test("Check Amt", () => {
  profile.purchase("GME", 2)
  expect(profile.getStockAmt("GME")).toBe(2);
});

test("No Empty Stocks", () => {
  profile.purchase("GME", 2)
  profile.sell("GME", 2)
  for(let stock_idx = 0; stock_idx < profile.stocks; stock_idx++) {
    expect(profile.stocks[stock_idx].tickers).toNotBe(0);
  }
});

test("No Over Sell", () => {
  profile.purchase("GME", 2)
  expect(() => {
    profile.sell("GME", 3)
  }).toThrow("ShareSaleException");

});