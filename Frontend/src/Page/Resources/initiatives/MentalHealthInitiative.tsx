import React from "react";

interface InitiativeProps {
  text: string;
  image: string;
  link: string;
  isTextOnLeft?: boolean;
  backgroundColor?: string;
  alt?: string;
}

const MentalHealthInitiative: React.FC<InitiativeProps> = ({
  text,
  image,
  link,
  isTextOnLeft = false,
  backgroundColor = "bg-white",
  alt = "Initiative",
}) => {
  return (
    
    <div
      className={`flex flex-col mx-auto md:flex-row ${
        isTextOnLeft ? "md:flex-row-reverse" : ""
      } items-center ${backgroundColor} p-8 rounded-xl shadow-lg border border-gray-200 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      {/* Image */}
      <div className="flex-1 text-center p-4">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img
            src={image}
            alt={alt}
            className="w-full max-w-[400px] rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </a>
      </div>
      {/* Text Content */}
      <div className="flex-1 text-center md:text-left p-4">
        <h3 className="text-2xl font-bold text-[#2a2450] mb-4">
          Mental Health Initiative
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1a73e8] hover:text-[#0f5bb5] transition-colors underline inline-flex items-center"
          >
            {text}
            <span className="ml-2 text-xl">🔗</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default MentalHealthInitiative;
