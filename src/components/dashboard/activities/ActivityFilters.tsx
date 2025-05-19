import FilterDropdown from "../common/FilterDropdown";

const ActivityFilters = () => {
  const timeOptions = ["Last 60 Days", "Last 30 Days", "Last 15 Days", "Last 7 Days"];
  const typeOptions = ["All", "Completed", "In Progress", "Not Started"];

  return (
    <div className="flex gap-2.5 items-center">
      <div className="flex items-center  gap-2.5">
        <div className="flex items-center gap-1.5 pl-2.5 rounded-[10px]">
          <span className="text-[10px] text-[#8C9BAC] font-poppins">Filter by:</span>
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

      
    </div>
  );
};

export default ActivityFilters;
