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
    <div className="flex flex-col lg:flex-row justify-center items-center mt-8 sm:mt-12 lg:mt-20 w-[95%] sm:w-[90%] lg:w-[80%] mx-auto px-4">
      <div className="flex flex-col justify-between p-4 sm:p-6 border-2 lg:border-r-0 border-black rounded-2xl lg:rounded-r-none h-auto lg:h-[220px] w-full lg:w-1/3 bg-[#DDECE9] shadow-md">
        <p className="text-[#1E3A3A] text-base sm:text-lg font-medium mb-6 lg:mb-0">
          Capture your thoughts, reflect on your day, and express your emotions
          through journaling.
        </p>
        {token ? (
          <div className='mt-4 lg:mt-10 w-full h-auto sm:h-16 flex justify-center items-center'>
            <Link
              to="/journal-entry"
              className="px-4 sm:px-6 w-full py-3 text-center bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition"
            >
              📝 Journal Entry
            </Link>
          </div>
        ) : (
          <div className='mt-4 lg:mt-10 w-full h-auto sm:h-16 flex justify-center items-center'>
            <Link
              to="/login"
              className="px-4 sm:px-6 w-full py-3 text-center bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition"
            >
              📝 Journal Entry
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between p-4 sm:p-6 bg-[#398885] rounded-2xl h-auto lg:h-[320px] w-full lg:w-1/3 shadow-md">
        <p className="text-white text-base sm:text-lg font-medium mb-6 lg:mb-0">
          Keep track of your emotions, identify patterns, and gain insights into
          your mental well-being.
        </p>
        <button
          onClick={onclick}
          className="px-4 sm:px-6 py-3 bg-[#1E3A3A] text-white font-semibold rounded-lg shadow-md hover:bg-[#193131] transition w-full"
        >
          📊 Check My Mood
        </button>
      </div>

      <div className="flex flex-col justify-between p-4 sm:p-6 border-2 lg:border-l-0 border-black rounded-2xl lg:rounded-l-none h-auto lg:h-[220px] w-full lg:w-1/3 bg-[#DDECE9] shadow-md">
        <p className="text-gray-700 text-base sm:text-lg font-medium mb-6 lg:mb-0">
          Relax and recharge with guided meditation sessions to improve focus
          and reduce stress.
        </p>
        <Link 
          to={`${token ? ("/meditation") : ("/login")}`} 
          className="px-4 sm:px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition w-full text-center"
        >
          🧘 Start Meditation
        </Link>
      </div>
    </div>
  );
};

export default QuickAccess;
