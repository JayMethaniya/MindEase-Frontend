import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const QuickAccess: React.FC = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function onclick() {
    if (token) {
      return navigate("/mood-tracking");
    } else {
      return navigate("/login");
    }
  }
  return (
    <div className="flex justify-center items-center mt-20 w-[80%] mx-auto">
      <div className="flex  flex-col justify-between  p-6 border-2 border-r-0 border-black rounded-2xl rounded-r-none h-[220px] w-1/3 bg-[#DDECE9] shadow-md">
        <p className="text-[#1E3A3A] text-lg font-medium">
          Capture your thoughts, reflect on your day, and express your emotions
          through journaling.
        </p>
        {token ? (
          <div className=' mt-16 w-full h-16 flex justify-center items-center'>
            <Link
              to="/journal-entry"
             className="px-6 w-full py-3 text-center bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition"
            >
              📝 Journal Entry
            </Link>
          </div>
        ) : (
          <div className=' mt-16 w-full h-16 flex justify-center items-center'>
            <Link
              to="/login"
              className="px-6 w-full py-3 text-center bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition"
            >
              📝 Journal Entry
            </Link>
          </div>
        )}
         
      </div>

      {/* Mood Tracker Card */}
      <div className="flex flex-col justify-between p-6 bg-[#398885] rounded-2xl h-[320px] w-1/3 shadow-md">
        <p className="text-white text-lg font-medium">
          Keep track of your emotions, identify patterns, and gain insights into
          your mental well-being.
        </p>
        <button
          onClick={onclick}
          className="px-6 py-3 bg-[#1E3A3A] text-white font-semibold rounded-lg shadow-md hover:bg-[#193131] transition"
        >
          📊 Check My Mood
        </button>
      </div>

      <div className="flex flex-col justify-between p-6 border-2 border-l-0 border-black rounded-2xl rounded-l-none h-[220px] w-1/3 bg-[#DDECE9] shadow-md">
        <p className="text-gray-700 text-lg font-medium">
          Relax and recharge with guided meditation sessions to improve focus
          and reduce stress.
        </p>
        <Link to={`${token ? ("/meditation") : ("/login")}`} className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition">
          🧘 Start Meditation
        </Link>
      </div>
    </div>
  );
};

export default QuickAccess;
