import React, { useState, useEffect } from "react";
import { Dashboard } from "./Components/Dashboard";
import "./App.css";

export default function App() {
  const [tickerData, setTickerData] = useState("0.00");

  useEffect(() => {
    const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    let msg = JSON.stringify({
      event: "subscribe",
      channel: "ticker",
      symbol: "tBTCUSD",
    });
    ws.onopen = () => {
      console.log("connected");
      ws.send(msg);
    };
    ws.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (typeof data[1] === "object")
        setTickerData({
          dailyChange: data[1][4],
          percentageDailyChange: data[1][5] * 100,
          currentPrice: data[1][6],
          volume: data[1][7],
          high: data[1][8],
          low: data[1][9],
        });
    };
  }, []);

  return (
    <div className="container">
      <Dashboard tickerData={tickerData} />
    </div>
  );
}
