import React from 'react';

import SupportGroups from './SupportGroups';
import SupportGroups2 from './SupportGroups2';

const SupportGroupsMain = () => {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <SupportGroups />
        <SupportGroups2 />
      </div>
    </div>
  );
};

export default SupportGroupsMain;