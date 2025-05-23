import React from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

type ActivityTabProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
};

const ActivityTab = ({ title, isActive, onClick }: ActivityTabProps) => {
  return (
    <div 
      className="flex flex-col items-center justify-center gap-2.5 py-5  pt-0 cursor-pointer w-full"
      onClick={onClick}
    >
      <div className={`border-b-2 w-full ${isActive ? 'border-[#338FFF]' : 'border-transparent'}`}></div>
      <span className={`text-sm md:text-base px-2 ${isActive ? 'text-[#338FFF]' : 'text-[#8C9BAC]'} font-medium font-poppins w-full text-center`}>
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
  const isMobile = useIsMobile();
  // Detect tab view (width between 600px and 960px)
  const [isTab, setIsTab] = React.useState(typeof window !== 'undefined' && window.innerWidth <= 960 && window.innerWidth > 600);
  React.useEffect(() => {
    const handleResize = () => {
      setIsTab(window.innerWidth <= 960 && window.innerWidth > 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Only show one word for mobile or tab view
  const singleWord = isMobile || isTab;

  const tabTitles = [
    { key: 'user', label: singleWord ? 'User' : 'User Activity' },
    { key: 'usage', label: singleWord ? 'Usage' : 'Usage Activity' },
    { key: 'course', label: singleWord ? 'Course' : 'Course Activity' }
  ];

  return (
    <div className={`flex items-center w-full pt-0 mt-0 bg-white overflow-x-auto gap-0`}>
      {tabTitles.map((tab, idx) => (
        <div
          className={
            isMobile
              ? 'flex-1'
              : idx === 0
                ? '' // No margin for the first tab
                : 'ml-5' // Add left margin for desktop tabs except the first
          }
          key={tab.key}
        >
          <ActivityTab 
            title={tab.label}
            isActive={activeTab === tab.key}
            onClick={() => handleTabClick(tab.key as TabType)}
          />
        </div>
      ))}
    </div>
  );
};

export default ActivityTabs;
