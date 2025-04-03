import React from 'react';
import CalmingVideosSlider from './CalmingVideosSlider';
import SleepStories from './SleepStories';
import MeditationResources from './MeditationResources';

const Relax = () => {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <CalmingVideosSlider />
        <SleepStories />
        <MeditationResources />
      </div>
    </div>
  );
};

export default Relax;
