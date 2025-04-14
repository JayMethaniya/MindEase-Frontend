import React from "react";
import CTA from "../../../assets/Frame 80.png";
import { Link } from "react-router-dom";

const Challenges: React.FC = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 justify-between px-6 lg:px-16 mt-10 bg-[#F1E8DD]">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <img
          src={CTA}
          alt="Mental Wellness Challenge"
          className="h-[416px] w-full  object-contain drop-shadow-lg"
        />
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#287371] leading-tight">
          🎯 <span className="text-[#1E3A3A]">7-Day</span> Mental Wellness
          Challenge
        </h2>
        <p className="text-base sm:text-lg text-[#3D4F4E] mt-4">
          Take small steps each day to improve your mental well-being. From
          mindfulness to gratitude, this challenge will help you build a
          positive routine.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          🧘 Reduce stress | 😃 Boost happiness | 🌿 Improve mindfulness
        </p>

        {/* Start Challenge Button */}
        <div className="mt-7">
        <Link to="/challenge" className=" px-6 py-3 bg-[#287371] text-white text-lg rounded-full shadow-lg hover:bg-[#1F5B5B] transition">
          Start Challenge
        </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Challenges;
