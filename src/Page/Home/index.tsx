import React from "react";
import MentalHealthVideo from "../../components/Mental Health Video/index";
import Grating from "../../components/Grating/index";
import HomeMain from "./HomeMain";
import Goal from '../../components/Goal/index'
import QuickAccess from "./QuickAccess";
import Challenges from "./Challenges";
import MoodSummary from "./MoodSummary";
const Home = () => {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#F1E8DD]">
      <div className=" mx-auto ">
        <Grating />
        <HomeMain />
        

        {/* Daily Mindfulness Tip Section */}
        <div className="w-full h-32 bg-[#398885] flex items-center justify-center px-4 text-center mt-4 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl text-white font-semibold">
            🌿 Daily Mindfulness Tip: Take a deep breath and be present.
          </h1>
        </div>
        <Goal/>
        <Challenges/>
        <MentalHealthVideo />
        <QuickAccess/>
       
        <MoodSummary/>

        {/* Horizontal Scroll Slider for Sections */}
        <div className="mt-8 w-full max-w-3xl overflow-x-auto">
          <div className="flex gap-6 w-max flex-nowrap px-4">
            {/* Community Updates */}
            <div className="p-6 bg-white shadow-md rounded-xl min-w-[280px] hover:shadow-lg transition">
              <h2 className="text-lg font-semibold text-[#287371]">Community Updates</h2>
              <p className="text-sm text-gray-600 mt-2">Check out trending discussions in the forum.</p>
            </div>

            {/* Upcoming Wellness Events */}
            <div className="p-6 bg-white shadow-md rounded-xl min-w-[280px] hover:shadow-lg transition">
              <h2 className="text-lg font-semibold text-[#287371]">Upcoming Wellness Events</h2>
              <p className="text-sm text-gray-600 mt-2">Join our next mental wellness workshop.</p>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Home;
