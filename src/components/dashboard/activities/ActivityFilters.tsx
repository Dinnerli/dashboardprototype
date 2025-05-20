import { useState } from "react";
import FilterDropdown from "../common/FilterDropdown";
import DateRangePicker from "../common/DateRangePicker";

const ActivityFilters = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: undefined
  });
  const typeOptions = ["All", "Marketing", "Accounts", "Sales", "Support"];
  
  const handleDateRangeChange = (from: Date, to: Date) => {
    setDateRange({ from, to });
    // Here you can implement any additional logic needed when the date range changes
    // For example, fetching filtered data based on the new date range
  };

  return (
    <div className="flex gap-2.5 items-center">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 pl-2.5 rounded-[10px]">
          <span className="text-[10px] text-[#8C9BAC] font-poppins">Filter by:</span>
        </div>
        <DateRangePicker 
          onDateRangeChange={handleDateRangeChange}
          defaultValue="Last 60 Days"
        />
        <FilterDropdown 
          options={typeOptions} 
          defaultValue="All" 
          size="sm"
        />
      </div>
    </div>  );
};

export default ActivityFilters;
