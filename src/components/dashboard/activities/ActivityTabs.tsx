
import React from 'react';

type ActivityTabProps = {
  title: string;
  isActive: boolean;
};

const ActivityTab = ({ title, isActive }: ActivityTabProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 py-5 px-2.5">
      <div className={`h-1 w-full ${isActive ? 'bg-[#338FFF]' : 'bg-transparent'}`}></div>
      <span className={`text-[16px] ${isActive ? 'text-[#338FFF]' : 'text-[#8C9BAC]'} font-bold font-poppins`}>
        {title}
      </span>
    </div>
  );
};

const ActivityTabs = () => {
  return (
    <div className="flex items-center gap-5 px-2.5 w-full bg-white overflow-x-auto">
      <ActivityTab title="User Activity" isActive={true} />
      <ActivityTab title="Usage Activities" isActive={false} />
      <ActivityTab title="Course Activities" isActive={false} />
    </div>
  );
};

export default ActivityTabs;
