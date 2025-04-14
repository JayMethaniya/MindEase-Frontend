import React from "react";

import Goal from "../../components/Goal/index";
import Grating from "../../components/Grating/index";
import MentalHealthVideo from "../../components/Mental Health Video/index";
import Challenges from "./components/Challenges";
import HomeMain from "./components/HomeMain";
import MoodSummary from "./components/MoodSummary";
import QuickAccess from "./components/QuickAccess";

const Home = () => {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#F1E8DD]">
      <div className="mx-auto">
        <Grating />
        <HomeMain />

        <div className="w-full h-32 bg-[#398885] flex items-center justify-center px-4 text-center mt-4 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl text-white font-semibold">
            🌿 Daily Mindfulness Tip: Take a deep breath and be present.
          </h1>
        </div>
        <Goal />
        <Challenges />
        <MentalHealthVideo />
        <QuickAccess />
        <MoodSummary />
      </div>
    </div>
  );
};

export default Home;
