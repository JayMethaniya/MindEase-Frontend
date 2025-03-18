import React from "react";
import MentalHealthVideoData from "./data";
export default function index() {
  const video1 =
    MentalHealthVideoData[
      Math.floor(Math.random() * MentalHealthVideoData.length)
    ];
    const video2 =
    MentalHealthVideoData[
      Math.floor(Math.random() * MentalHealthVideoData.length)
    ];
  return (
    <div className="mt-8">
      <h2 className="text-xl text-center font-bold">Mental Health Videos</h2>
      <div className="flex justify-between gap-3">
        <iframe
          className=" mx-auto w-[560px] h-[315px] mt-6 rounded-lg"
          src={video1}
          title="Mental Wellness"
        ></iframe>
           <iframe
          className=" mx-auto w-[560px] h-[315px] mt-6 rounded-lg"
          src={video2}
          title="Mental Wellness"
        ></iframe>
      </div>
    </div>
  );
}
