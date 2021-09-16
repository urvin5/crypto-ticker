import React from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { usePrevious } from "../Hooks/usePrevious";
export function Dashboard({ tickerData }) {
  const previousPrice = usePrevious(tickerData.currentPrice);

  if (tickerData.currentPrice === "0.00") {
    return <h2>please select a currency pair</h2>;
  }

  return (
    <div
      className="flex max-w-lg justify-between p-4"
      style={{ background: "#172d3e", color: "#fff" }}
    >
      <div className="flex items-center">
        <img
          src="https://static.bitfinex.com/images/icons/BTC-alt.svg"
          alt="btc"
          className="h-10 z-10 mr-4"
        />
        <div>
          <p>BTC/USD</p>
          <p>VOL {tickerData?.volume?.toFixed(2)} BTC</p>
          <p>LOW {tickerData.low}</p>
        </div>
      </div>
      <div>
        <h3
          className={`flex items-center ${
            previousPrice < tickerData.currentPrice
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {tickerData?.currentPrice?.toFixed(2)}{" "}
          {previousPrice < tickerData?.currentPrice ? (
            <BiUpArrow />
          ) : (
            <BiDownArrow />
          )}
        </h3>
        <h3
          className={`flex items-center ${
            tickerData?.percentageDailyChange > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {tickerData?.dailyChange?.toFixed(2)}
          {tickerData?.percentageDailyChange > 0 ? (
            <BiUpArrow />
          ) : (
            <BiDownArrow />
          )}{" "}
          ({tickerData?.percentageDailyChange?.toFixed(2)})%
        </h3>
        <h3>HIGH {tickerData.high}</h3>
      </div>
    </div>
  );
}
