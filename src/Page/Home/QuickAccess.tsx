import React from "react";

const QuickAccess: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-20 w-[80%] mx-auto">
      <div className="flex flex-col justify-between p-6 border-2 border-r-0 border-black rounded-2xl rounded-r-none h-[220px] w-1/3 bg-[#DDECE9] shadow-md">
        <p className="text-gray-700 text-lg font-medium">
          Capture your thoughts, reflect on your day, and express your emotions through journaling.
        </p>
        <button className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition">
          📝 Journal Entry
        </button>
      </div>

      {/* Mood Tracker Card */}
      <div className="flex flex-col justify-between p-6 bg-[#398885] rounded-2xl h-[320px] w-1/3 shadow-md">
        <p className="text-white text-lg font-medium">
          Keep track of your emotions, identify patterns, and gain insights into your mental well-being.
        </p>
        <button className="px-6 py-3 bg-[#1E3A3A] text-white font-semibold rounded-lg shadow-md hover:bg-[#193131] transition">
          📊 Check My Mood
        </button>
      </div>
      
      <div className="flex flex-col justify-between p-6 border-2 border-l-0 border-black rounded-2xl rounded-l-none h-[220px] w-1/3 bg-[#DDECE9] shadow-md">
        <p className="text-gray-700 text-lg font-medium">
          Relax and recharge with guided meditation sessions to improve focus and reduce stress.
        </p>
        <button className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition">
          🧘 Start Meditation
        </button>
      </div>
    </div>
  );
};

export default QuickAccess;
