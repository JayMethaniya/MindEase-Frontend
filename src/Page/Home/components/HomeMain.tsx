import React from "react";
import homeMain from "../../../assets/5 - Cardiologist.png";
import { Link } from "react-router-dom";

export default function HomeMain() {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16 justify-between py-12 md:px-6 px-4 lg:px-8">
      {/* Left Section - Text Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A3A] leading-tight">
          Empower Your Mind, <br />
          <span className="text-[#287371]">Prioritize Mental Wellness</span>
        </h1>
        <p className="text-base sm:text-lg text-[#3D4F4E] mt-4 max-w-2xl">
          Your mental health is just as important as your physical health. Let's
          take a step towards self-care, emotional well-being, and a healthier
          mind.
        </p>
        <div className="mt-8">
          <Link 
            to="/page/contactUs" 
            className="inline-block px-8 py-3 bg-[#287371] text-white text-lg font-medium rounded-full shadow-lg hover:bg-[#1E3A3A] transition-all duration-300 transform hover:scale-105"
          >
            Get Support
          </Link>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <img
          className="h-[300px] sm:h-[400px] w-full object-contain drop-shadow-2xl"
          src={homeMain}
          alt="Mental Health Support"
        />
      </div>
    </div>
  );
}
