import React from "react";
import { Link } from "react-router-dom";

const ChallengePage: React.FC = () => {
  const challenges = [
    { day: 1, task: "Practice 5 minutes of deep breathing." },
    { day: 2, task: "Write down three things you're grateful for." },
    { day: 3, task: "Take a 10-minute walk in nature." },
    { day: 4, task: "Disconnect from screens for an hour before bed." },
    { day: 5, task: "Listen to calming music or meditate for 10 minutes." },
    { day: 6, task: "Do something kind for someone else." },
    { day: 7, task: "Reflect on your progress and set future goals." },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-[#287371]">
        7-Day Mental Wellness Challenge
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Follow these daily tasks to improve your mental well-being.
      </p>

      <div className="mt-6 space-y-4">
        {challenges.map((item) => (
          <div key={item.day} className="p-4 bg-[#F1E8DD] rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#1E3A3A]">
              Day {item.day}
            </h2>
            <p className="text-gray-700">{item.task}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          to="/"
          className="px-6 py-3 bg-[#287371] text-white text-lg rounded-full shadow-lg hover:bg-[#1F5B5B] transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ChallengePage;
