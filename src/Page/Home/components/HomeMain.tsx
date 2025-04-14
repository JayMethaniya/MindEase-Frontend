import React from "react";
import homeMain from "../../../assets/5 - Cardiologist.png";
import { Link } from "react-router-dom";

export default function HomeMain() {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 justify-between px-6 lg:px-16 mt-10 bg-[#F1E8DD]">
      {/* Left Section - Text Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A3A] leading-tight">
          Empower Your Mind, <br />
          <span className="text-[#287371]">Prioritize Mental Wellness</span>
        </h1>
        <p className="text-base sm:text-lg text-[#3D4F4E] mt-4">
          Your mental health is just as important as your physical health. Let’s
          take a step towards self-care, emotional well-being, and a healthier
          mind.
        </p>
        <div className="mt-6">
          <Link to="/page/contactUs" className=" px-6 py-3 bg-[#287371] text-white text-lg rounded-full shadow-lg hover:bg-[#1F5B5B] transition">
            Get Support
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <img
          className="h-[416px] w-full mt-8  object-contain drop-shadow-lg"
          src={homeMain}
          alt="Mental Health Support"
        />
      </div>
    </div>
  );
}
