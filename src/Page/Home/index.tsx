import React from "react";
import Goal from "../../components/Goal/index";
import Grating from "../../components/Grating/index";
import MentalHealthVideo from "../../components/Mental Health Video/index";
import Challenges from "./components/Challenges";
import HomeMain from "./components/HomeMain";
import MoodSummary from "./components/MoodSummary";
import QuickAccess from "./components/QuickAccess";
import DailyTip from './components/DailyTip';

const Home = () => {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#F1F8F8]">
      <div className="mx-auto">
        <Grating />
        <HomeMain />

        <div className="w-full h-24 sm:h-32 bg-[#287371] flex items-center justify-center px-4 text-center mt-8">
        <DailyTip />
        </div>

        <div className="mt-12 space-y-12">
          <Goal />
          <Challenges />
          <MentalHealthVideo />
          <QuickAccess />
          <MoodSummary />
         
        </div>
      </div>
    </div>
  );
};

export default Home;
