import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FilterDropdown from "../common/FilterDropdown";
import DateRangePicker from "../common/DateRangePicker";
import MobileDateRangePicker from "../common/MobileDateRangePicker";
import HierarchicalFilterDropdown, { type HierarchicalOption } from "../common/HierarchicalFilterDropdown";
import { useDepartments } from "../../../hooks/useDepartments";

const ActivityFilters = ({ dateRange, onDateRangeChange, onDepartmentChange, department, ...rest }: {
  dateRange: { from: Date; to: Date | undefined };
  onDateRangeChange: (from: Date, to: Date) => void;
  department: string;
  onDepartmentChange: (department: string) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date();
  const defaultFrom = new Date(today);
  defaultFrom.setDate(today.getDate() - 29); // last 30 days (inclusive)
  const [showMobileFilters, setShowMobileFilters] = useState(false); // mobile filter toggle
  
  // Use the departments hook instead of hardcoded values
  const { data: departmentOptions, loading: departmentsLoading } = useDepartments();
  
  // State for hierarchical filter selections
  const [selectedDepartmentIds, setSelectedDepartmentIds] = useState<string[]>([]);

  // Add local pendingDateRange state for controlled update
  const [pendingDateRange, setPendingDateRange] = useState<{ from: Date; to: Date | undefined }>(dateRange);

  // Helper to format date as yyyy-mm-dd
  const formatDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };
  // Update URL params
  const updateUrlParams = (from: Date, to: Date | undefined, departmentIds: string[]) => {
    const params = new URLSearchParams(location.search);
    params.set("startDate", formatDate(from));
    params.set("endDate", formatDate(to || from));
    
    // Handle department IDs in URL params
    if (departmentIds.length > 0) {
      params.set("groups", departmentIds.join(','));
    } else {
      params.delete("groups");
    }
   
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  };
  // Handle hierarchical department selection
  const handleHierarchicalDepartmentChange = (selectedIds: string[]) => {
    setSelectedDepartmentIds(selectedIds);
    // Update the old department prop for backward compatibility
    onDepartmentChange(selectedIds.length > 0 ? selectedIds.join(',') : 'All');
  };

  // Convert department options to hierarchical format
  const hierarchicalOptions: HierarchicalOption[] = departmentOptions || [];

  // On mount, set default params and restore from storage if available
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const departmentsParam = urlParams.get('groups');
    
    // Try to restore filters from localStorage
    const storedFilters = localStorage.getItem('dashboard-filters');
    if (storedFilters) {
      try {
        const { startDate, endDate, departments } = JSON.parse(storedFilters);
        if (startDate && endDate) {
          onDateRangeChange(new Date(startDate), new Date(endDate));
          if (departments && Array.isArray(departments)) {
            setSelectedDepartmentIds(departments);
            onDepartmentChange(departments.join(','));
          }
          updateUrlParams(new Date(startDate), new Date(endDate), departments || []);
          return;
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
    
    // Initialize from URL params
    if (departmentsParam) {
      const deptIds = departmentsParam.split(',').filter(Boolean);
      setSelectedDepartmentIds(deptIds);
      onDepartmentChange(departmentsParam);
    }
    
    updateUrlParams(dateRange.from, dateRange.to, departmentsParam ? departmentsParam.split(',').filter(Boolean) : []);
    // eslint-disable-next-line
  }, []);
  // Remove all code that sets dateRange or department from any other effect
  // Only updateUrlParams and persist to localStorage when date/department changes
  useEffect(() => {
    updateUrlParams(dateRange.from, dateRange.to, selectedDepartmentIds);
    // Save to localStorage
    localStorage.setItem('dashboard-filters', JSON.stringify({
      startDate: dateRange.from,
      endDate: dateRange.to || dateRange.from,
      departments: selectedDepartmentIds,
    }));
    // eslint-disable-next-line
  }, [dateRange, selectedDepartmentIds]);

  // Sync calendar UI with dateRange from props (from parent/params)
  useEffect(() => {
    setPendingDateRange(dateRange);
  }, [dateRange]);


  
 


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
            onDateRangeChange={onDateRangeChange}
            defaultValue="Last 30 Days"
            value={pendingDateRange}
          />
        </div>        {/* Filters section */}
        <div className="flex w-64 items-center gap-2 border border-[#E5E7EB] rounded-md bg-white">
          <HierarchicalFilterDropdown
            options={hierarchicalOptions}
            defaultValue={[]}
            size="sm"
            onChange={handleHierarchicalDepartmentChange}
            value={selectedDepartmentIds}
            disabled={departmentsLoading}
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
                  onDateRangeChange={onDateRangeChange}
                  defaultValue="Last 30 Days"
                  value={pendingDateRange}
                />
              </div>              <div className="flex items-center gap-2 border border-[#E5E7EB] rounded-md bg-white">
                <HierarchicalFilterDropdown
                  options={hierarchicalOptions}
                  defaultValue={[]}
                  size="sm"
                  onChange={handleHierarchicalDepartmentChange}
                  value={selectedDepartmentIds}
                  disabled={departmentsLoading}
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
