
import { ChevronDown } from 'lucide-react';

const ActivityFilters = () => {
  return (
    <div className="flex gap-2.5 items-center">
      <div className="flex items-center h-[30px] gap-2.5">
        <div className="flex items-center gap-1.5 pl-2.5 rounded-[10px]">
          <span className="text-[10px] text-[#8C9BAC] font-poppins">Filter by:</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-[10px]">
          <span className="text-[10px] text-[#8C9BAC] font-poppins">Last 60 Days</span>
          <ChevronDown className="w-6 h-6 text-[#8C9BAC]" stroke="#8C9BAC" />
        </div>
        <div className="flex items-center gap-1.5 rounded-[10px]">
          <span className="text-[10px] text-[#8C9BAC] font-poppins">All</span>
          <ChevronDown className="w-6 h-6 text-[#8C9BAC]" stroke="#8C9BAC" />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center gap-1.5 px-0 py-1.5">
          <span className="text-[10px] text-[#4F5A69] font-poppins text-center">View Report</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityFilters;
