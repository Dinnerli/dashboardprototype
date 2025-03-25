
import FilterDropdown from "../common/FilterDropdown";

const ActivityFilters = () => {
  const timeOptions = ["Last 60 Days", "Last 30 Days", "Last 15 Days", "Last 7 Days"];
  const typeOptions = ["All", "Completed", "In Progress", "Not Started"];

  return (
    <div className="flex gap-2.5 items-center">
      <div className="flex items-center h-[30px] gap-2.5">
        <div className="flex items-center gap-1.5 pl-2.5 rounded-[10px]">
          <span className="text-xs text-[#8C9BAC] font-poppins">Filter by:</span>
        </div>
        <FilterDropdown 
          options={timeOptions} 
          defaultValue="Last 60 Days" 
          size="sm"
        />
        <FilterDropdown 
          options={typeOptions} 
          defaultValue="All" 
          size="sm"
        />
      </div>

      <div className="flex items-center">
        <div className="flex items-center justify-center gap-1.5 px-0 py-1.5">
          <span className="text-[10px] text-[#4F5A69] font-poppins text-center cursor-pointer hover:text-[#338FFF] transition-colors">View Report</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityFilters;
