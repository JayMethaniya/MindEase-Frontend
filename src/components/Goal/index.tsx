import React, { useEffect, useState } from 'react';

import { goalsList, mentalHealthTips } from './data';

const getTodayDate = (): string => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

const Goals: React.FC = () => {
  const [goals, setGoals] = useState<string[]>([]);
  const [randomTip, setRandomTip] = useState<string>("");

  useEffect(() => {
    const today = getTodayDate();
    const savedGoals = JSON.parse(localStorage.getItem("dailyGoals") || "{}");
    const savedTip = JSON.parse(localStorage.getItem("dailyTip") || "{}");

    if (savedGoals.date === today) {
      setGoals(savedGoals.goals);
    } else {
      const shuffledGoals = [...goalsList].sort(() => 0.5 - Math.random());
      const newGoals = shuffledGoals.slice(0, 3);
      setGoals(newGoals);
      localStorage.setItem(
        "dailyGoals",
        JSON.stringify({ date: today, goals: newGoals })
      );
    }

    // Handle daily tip
    if (savedTip.date === today) {
      setRandomTip(savedTip.tip);
    } else {
      const randomIndex = Math.floor(Math.random() * mentalHealthTips.length);
      const newTip = mentalHealthTips[randomIndex];
      setRandomTip(newTip);
      localStorage.setItem(
        "dailyTip",
        JSON.stringify({ date: today, tip: newTip })
      );
    }
  }, []);

  return (
    <div className="bg-white w-full md:w-4/5 lg:w-2/3 p-4 md:p-6 lg:p-8 rounded-2xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#287371] text-center">
        🎯 Today's Mental Health Goals
      </h2>

      {/* Goal List */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-4 md:mt-5">
        {goals.map((goal, index) => (
          <div
            key={index}
            className="p-3 md:p-4 w-full sm:w-48 md:w-60 h-[100px] bg-[#DDECE9] text-center flex items-center justify-center rounded-lg text-[#1E3A3A] text-base md:text-lg font-medium shadow-md hover:bg-[#C3DFD7] transition"
          >
            {goal}
          </div>
        ))}
      </div>

      {/* Mental Health Tip Section */}
      <div className="mt-6 md:mt-8 bg-[#DDECE9] py-4 md:py-5 mx-4 md:mx-8 lg:mx-28 rounded-xl shadow-md text-center">
        <h3 className="text-xl md:text-2xl font-semibold text-[#287371]">
          🧘 Mental Health Tip of the Day
        </h3>
        <p className="text-gray-600 text-base md:text-xl mt-2 px-2 md:px-4">{randomTip}</p>
      </div>
    </div>
  );
};

export default Goals;
