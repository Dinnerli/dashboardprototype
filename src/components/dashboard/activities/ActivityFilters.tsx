import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const ActivityFilters = () => {
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Last 60 Days');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const timeFilterOptions = ['Last 60 Days', 'Last 30 Days', 'Last 14 Days', 'Last 7 Days', 'Today'];
  const statusOptions = ['All', 'Active', 'Inactive', 'Completed'];

  return (
    <div className="flex gap-2.5 items-center">
      <div className="flex items-center h-[30px] gap-2.5">
        <div className="flex items-center gap-1.5 pl-2.5 rounded-[10px]">
          <span className="text-xs text-[#8C9BAC] font-poppins">Filter by:</span>
        </div>

        {/* Time Filter Dropdown */}
        <div className="relative">
          <div 
            className="flex items-center gap-1.5 rounded-[10px] cursor-pointer"
            onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
          >
            <span className="text-xs text-[#8C9BAC] font-poppins">{selectedTimeFilter}</span>
            <ChevronDown 
              className={`w-6 h-6 text-[#8C9BAC] transition-transform duration-200 ${isTimeDropdownOpen ? 'rotate-180' : ''}`} 
              stroke="#8C9BAC" 
            />
          </div>
          
          {isTimeDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 z-50 min-w-[140px] border border-gray-100">
              {timeFilterOptions.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 text-xs text-[#8C9BAC] hover:bg-gray-50 cursor-pointer font-poppins"
                  onClick={() => {
                    setSelectedTimeFilter(option);
                    setIsTimeDropdownOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative">
          <div 
            className="flex items-center gap-1.5 rounded-[10px] cursor-pointer"
            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
          >
            <span className="text-xs text-[#8C9BAC] font-poppins">{selectedStatus}</span>
            <ChevronDown 
              className={`w-6 h-6 text-[#8C9BAC] transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} 
              stroke="#8C9BAC" 
            />
          </div>
          
          {isStatusDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 z-50 min-w-[140px] border border-gray-100">
              {statusOptions.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 text-xs text-[#8C9BAC] hover:bg-gray-50 cursor-pointer font-poppins"
                  onClick={() => {
                    setSelectedStatus(option);
                    setIsStatusDropdownOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center justify-center gap-1.5 px-0 py-1.5">
          <span className="text-xs text-[#4F5A69] font-poppins text-center">View Report</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityFilters;
