
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type ActivityTabProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
};

const ActivityTab = ({ title, isActive, onClick }: ActivityTabProps) => {
  return (
    <div 
      className="flex flex-col items-center justify-center gap-2.5 py-5 px-2.5 cursor-pointer"
      onClick={onClick}
    >
      <div className={`h-1 w-full ${isActive ? 'bg-[#338FFF]' : 'bg-transparent'}`}></div>
      <span className={`text-[16px] ${isActive ? 'text-[#338FFF]' : 'text-[#8C9BAC]'} font-bold font-poppins`}>
        {title}
      </span>
    </div>
  );
};

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
    <div className="flex items-center gap-5 px-2.5 w-full bg-white overflow-x-auto">
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
