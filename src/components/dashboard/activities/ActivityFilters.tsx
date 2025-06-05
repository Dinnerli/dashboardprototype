import { useState } from "react";
import FilterDropdown from "../common/FilterDropdown";
import DateRangePicker from "../common/DateRangePicker";

const ActivityFilters = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: undefined
  });
  const departmentOptions = ["All", "Marketing", "Accounts", "Sales", "Development"];
  
  const handleDateRangeChange = (from: Date, to: Date) => {
    setDateRange({ from, to });
    // Here you can implement any additional logic needed when the date range changes
    // For example, fetching filtered data based on the new date range
  };

  return (
    <div className="flex gap-6 items-center">
      {/* Start and end date section */}
      <div className="flex min-w-48 items-center gap-2 border border-[#E5E7EB] rounded-md  bg-white">
       
        <DateRangePicker 
          onDateRangeChange={handleDateRangeChange}
          defaultValue="Last 60 Days"
        />
      </div>
      
      {/* Filters section */}
      <div className="flex min-w-48 items-center gap-2 border border-[#E5E7EB] rounded-md  bg-white">
       
        <FilterDropdown 
          options={departmentOptions} 
          defaultValue="All" 
          size="sm"
        />
      </div>
    </div>  );
};

export default ActivityFilters;
