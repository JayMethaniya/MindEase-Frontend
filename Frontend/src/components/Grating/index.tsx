import React, { useState, useEffect } from "react";
import quotes from "./data";

export default function Index() {
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good Morning! 🌅");
    else if (hours < 18) setGreeting("Good Afternoon! ☀️");
    else setGreeting("Good Evening! 🌙");

    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div>
      <div className="text-center text-2xl font-bold">{greeting}</div>
      <div className="text-center text-2xl font-bold text-[#1e3245] mt-2">"{quote}"</div>
    </div>
  );
}
