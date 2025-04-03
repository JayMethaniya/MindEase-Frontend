import React from "react";
import { Users, HeartHandshake, Landmark } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <div className="w-full bg-[#F1E8DD] py-16 px-8 flex flex-col items-center">
      {/* Section Heading */}
      <h3 className="text-lg text-[#287371] font-semibold">Why?</h3>
      <h2 className="text-3xl font-bold text-[#1E3245] text-center mt-2">
        Why Our Mental Health Consultants are <br /> the Best Choice
      </h2>

      {/* Content Boxes */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12 max-w-5xl">
        {/* Holistic Approach */}
        <div className="w-80 p-6 border rounded-xl bg-white shadow-lg text-center hover:shadow-xl transition">
          <HeartHandshake size={48} className="mx-auto text-[#1E3245]" />
          <h4 className="font-bold text-xl mt-4 text-[#1E3245]">Holistic Approach</h4>
          <p className="text-gray-600 mt-2 text-sm">
            We focus on your overall well-being—mind, body, and emotions—to help you achieve balance in life.
          </p>
        </div>

        {/* Expertise Team - Highlighted */}
        <div className="w-80 p-8 rounded-xl shadow-lg text-center bg-gradient-to-b from-[#287371] to-[#1F5B5B] text-white">
          <Users size={48} className="mx-auto text-white" />
          <h4 className="font-bold text-xl mt-4">Expertise Team</h4>
          <p className="mt-2 text-sm">
            Our certified professionals bring experience, compassion, and innovative strategies to mental health care.
          </p>
        </div>

        {/* Accessibility */}
        <div className="w-80 p-6 border rounded-xl bg-white shadow-lg text-center hover:shadow-xl transition">
          <Landmark size={48} className="mx-auto text-[#1E3245]" />
          <h4 className="font-bold text-xl mt-4 text-[#1E3245]">Accessibility</h4>
          <p className="text-gray-600 mt-2 text-sm">
            We provide easy, flexible, and affordable mental health support—anytime, anywhere.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
