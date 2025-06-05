import { useState } from "react";
import FilterDropdown from "../common/FilterDropdown";
import DateRangePicker from "../common/DateRangePicker";
import MobileDateRangePicker from "../common/MobileDateRangePicker";

const ActivityFilters = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: undefined
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false); // mobile filter toggle
  const departmentOptions = ["All", "Marketing", "Accounts", "Sales", "Development"];
  
  const handleDateRangeChange = (from: Date, to: Date) => {
    setDateRange({ from, to });
    // Here you can implement any additional logic needed when the date range changes
    // For example, fetching filtered data based on the new date range
  };

  return (
    <div className="flex gap-6 items-center">
      {/* Mobile Filters Button */}
      <button
        className="md:hidden px-4 py-2 border border-[#E5E7EB] rounded-md bg-white text-sm font-medium"
        onClick={() => setShowMobileFilters((prev) => !prev)}
      >
        Filters
      </button>

      {/* Filters for desktop */}
      <div className="hidden md:flex gap-6 items-center">
        {/* Start and end date section */}
        <div className="flex w-80 items-center gap-2 border border-[#E5E7EB] rounded-md bg-white">
          <DateRangePicker 
            onDateRangeChange={handleDateRangeChange}
            defaultValue="Last 60 Days"
          />
        </div>
        {/* Filters section */}
        <div className="flex w-64 items-center gap-2 border border-[#E5E7EB] rounded-md bg-white">
          <FilterDropdown 
            options={departmentOptions} 
            defaultValue="All" 
            size="sm"
          />
        </div>
      </div>

      {/* Mobile Filters Dropdown/Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 md:hidden">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-sm shadow-lg flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 border border-[#E5E7EB] rounded-md bg-white">
                <MobileDateRangePicker 
                  onDateRangeChange={handleDateRangeChange}
                  defaultValue="Last 60 Days"
                />
              </div>
              <div className="flex items-center gap-2 border border-[#E5E7EB] rounded-md bg-white">
                <FilterDropdown 
                  options={departmentOptions} 
                  defaultValue="All" 
                  size="sm"
                />
              </div>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md font-medium"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityFilters;
