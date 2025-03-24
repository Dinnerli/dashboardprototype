
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const ActivityFilters = () => {
  const [activeTimeFilter, setActiveTimeFilter] = useState('Last 60 Days');
  const [activeTypeFilter, setActiveTypeFilter] = useState('All');

  const handleTimeFilterClick = () => {
    // Toggle between time filter options
    setActiveTimeFilter(activeTimeFilter === 'Last 60 Days' ? 'Last 30 Days' : 'Last 60 Days');
  };

  const handleTypeFilterClick = () => {
    // Toggle between type filter options
    setActiveTypeFilter(activeTypeFilter === 'All' ? 'Completed' : 'All');
  };

  const handleViewReportClick = () => {
    console.log('View Report clicked');
    // This would typically navigate to a report page or open a modal
  };

  return (
    <div className="flex gap-2.5 items-center">
      <div className="flex items-center h-[30px] gap-2.5">
        <div className="flex items-center gap-1.5 pl-2.5 rounded-[10px]">
          <span className="text-[10px] text-[#8C9BAC] font-poppins">Filter by:</span>
        </div>
        <div 
          className="flex items-center gap-1.5 rounded-[10px] cursor-pointer hover:bg-gray-100 px-2 py-1"
          onClick={handleTimeFilterClick}
        >
          <span className="text-[10px] text-[#8C9BAC] font-poppins">{activeTimeFilter}</span>
          <ChevronDown className="w-6 h-6 text-[#8C9BAC]" stroke="#8C9BAC" />
        </div>
        <div 
          className="flex items-center gap-1.5 rounded-[10px] cursor-pointer hover:bg-gray-100 px-2 py-1"
          onClick={handleTypeFilterClick}
        >
          <span className="text-[10px] text-[#8C9BAC] font-poppins">{activeTypeFilter}</span>
          <ChevronDown className="w-6 h-6 text-[#8C9BAC]" stroke="#8C9BAC" />
        </div>
      </div>
      <div className="flex items-center">
        <div 
          className="flex items-center justify-center gap-1.5 px-2 py-1.5 cursor-pointer hover:bg-gray-100 rounded-md"
          onClick={handleViewReportClick}
        >
          <span className="text-[10px] text-[#4F5A69] font-poppins text-center">View Report</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityFilters;
