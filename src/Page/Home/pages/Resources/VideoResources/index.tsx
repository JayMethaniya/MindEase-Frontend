import React from 'react';

import MentalHealthVideoData from '../../../../../components/Mental Health Video/data';

const MentalIllnessGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
      {MentalHealthVideoData.map((videoUrl, index) => (
        <div key={index} className="w-full  h-[200px]">
          <iframe
            className="w-full h-full rounded-lg shadow-md"
            src={videoUrl}
            title={`Mental Health Video ${index + 1}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default MentalIllnessGrid;
