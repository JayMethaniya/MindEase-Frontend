import React from "react";
import MentalHealthVideoData from "./data";

export default function MentalHealthVideo() {
  let video1, video2 , video3;

  if (MentalHealthVideoData.length > 1) {
    do {
      video1 =
        MentalHealthVideoData[
          Math.floor(Math.random() * MentalHealthVideoData.length)
        ];
      video2 =
        MentalHealthVideoData[
          Math.floor(Math.random() * MentalHealthVideoData.length)
        ];
        video3 =
        MentalHealthVideoData[
          Math.floor(Math.random() * MentalHealthVideoData.length)
        ];
    } while (video1 === video2); 
  } else {
    video1 = video2 = MentalHealthVideoData[0]; 
  }

  return (
    <div className="w-full max-w-full overflow-hidden px-4 mt-8">
      <h2 className="text-3xl text-center font-bold text-[#287371]">
        🎥 Motivational Videos
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-6 max-w-7xl mx-auto">
        {/* Video iframes */}
        <div className="w-full md:w-1/2">
          <iframe
            className="w-full aspect-video rounded-lg shadow-lg"
            src={video1}
            title="Mental Wellness Video 1"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-full md:w-1/2">
          <iframe
            className="w-full aspect-video rounded-lg shadow-lg"
            src={video2}
            title="Mental Wellness Video 2"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-full md:w-1/2">
          <iframe
            className="w-full aspect-video rounded-lg shadow-lg"
            src={video3}
            title="Mental Wellness Video 2"
            allowFullScreen
          ></iframe>
        </div>
        
      </div>
    </div>
  );
}
