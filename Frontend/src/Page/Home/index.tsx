import React from "react";
import MentalHealthVideo from "../../components/Mental Health Video/index";
import Grating from "../../components/Grating/index";

const Home = () => {
  return (
    <div className="h-full py-4 w-screen text-[#287371] flex flex-col items-center overflow-auto ">
      <Grating />

      {/* Mental Health Video */}
      <MentalHealthVideo />

      {/* Mood Insights Summary */}
      <div className="mt-8 w-full max-w-3xl bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold text-[#287371]">
          Mood Insights Summary
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Since you’ve been feeling stressed, try a short meditation session.
        </p>
        <div className="h-24 bg-gray-100 mt-4 rounded-lg"></div>
      </div>

      {/* Horizontal Scroll Slider for Sections */}
      <div className="mt-8 w-full max-w-3xl overflow-x-auto">
        <div className="flex gap-6 w-max flex-nowrap">
          {/* Community Updates */}
          <div className="p-6 bg-white shadow-md rounded-xl min-w-[280px]">
            <h2 className="text-lg font-semibold text-[#287371]">
              Community Updates
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Check out trending discussions in the forum.
            </p>
          </div>

          {/* Upcoming Wellness Events */}
          <div className="p-6 bg-white shadow-md rounded-xl min-w-[280px]">
            <h2 className="text-lg font-semibold text-[#287371]">
              Upcoming Wellness Events
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Join our next mental wellness workshop.
            </p>
          </div>
        </div>
      </div>

      {/* Mental Health Quiz & Relaxation Timer */}
      <div className="mt-8 flex flex-col md:flex-row gap-6 w-full max-w-3xl">
        <div className="p-6 bg-white shadow-md rounded-xl flex-1 text-center">
          <h2 className="text-lg font-semibold text-[#287371]">
            Mental Health Quiz
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Take a short quiz to reflect on your emotions.
          </p>
          <button className="mt-4 bg-[#287371] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#1f5b5b] transition">
            Start Quiz
          </button>
        </div>
        <div className="p-6 bg-white shadow-md rounded-xl flex-1 text-center">
          <h2 className="text-lg font-semibold text-[#287371]">
            Relaxation Timer
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Set a timer for deep breathing or focus sessions.
          </p>
          <button className="mt-4 bg-[#1e3245] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#12212f] transition">
            Start Timer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
