
import React from 'react';

type ActivityTabProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
};

const ActivityTab = ({ title, isActive, onClick }: ActivityTabProps) => {
  return (
    <div 
      className="flex flex-col items-center justify-center gap-2.5 py-5 px-2.5 pt-0 cursor-pointer"
      onClick={onClick}
    >
      <div className={`h-1 w-full ${isActive ? 'bg-[#338FFF]' : 'bg-transparent'}`}></div>
      <span className={`text-sm ${isActive ? 'text-[#338FFF]' : 'text-[#8C9BAC]'} font-medium font-poppins`}>
        {title}
      </span>
    </div>
  );
};

// Make sure TabType is properly defined as a union of literal string types
export type TabType = 'user' | 'usage' | 'course';

interface ActivityTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const ActivityTabs = ({ activeTab, setActiveTab }: ActivityTabsProps) => {
  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex items-center gap-5 px-2.5 w-full pt-0 mt-0 bg-white overflow-x-auto">
      <ActivityTab 
        title="User Activity" 
        isActive={activeTab === 'user'} 
        onClick={() => handleTabClick('user')}
      />
      <ActivityTab 
        title="Usage Activities" 
        isActive={activeTab === 'usage'} 
        onClick={() => handleTabClick('usage')}
      />
      <ActivityTab 
        title="Course Activities" 
        isActive={activeTab === 'course'} 
        onClick={() => handleTabClick('course')}
      />
    </div>
  );
};

export default ActivityTabs;
