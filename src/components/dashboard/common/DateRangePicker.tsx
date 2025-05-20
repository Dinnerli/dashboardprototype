import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

interface DateRangePickerProps {
  onDateRangeChange?: (startDate: Date, endDate: Date) => void;
  defaultValue?: string;
}

type DateRange = {
  from: Date;
  to: Date | undefined;
};

const DateRangePicker = ({
  onDateRangeChange,
  defaultValue = "Last 60 Days",
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  // Initialize with the default option's date range
  const today = new Date();
  const defaultFrom = new Date(today);
  defaultFrom.setDate(today.getDate() - 60); // Default is Last 60 Days
  
  const [dateRange, setDateRange] = useState<DateRange>({
    from: defaultFrom,
    to: today,
  });
  
  const [monthsToShow, setMonthsToShow] = useState<Date[]>([
    new Date(), 
    addMonths(new Date(), 1)
  ]);
  
  // Set active tab based on defaultValue
  const [activeTab, setActiveTab] = useState<string>(
    defaultValue.toLowerCase().replace(/\s/g, "-")
  );

  // Handle popover open state
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };
  // Handle the quick selection of predefined date ranges
  const handleQuickSelect = (option: string) => {
    setSelectedOption(option);
    setActiveTab(option.toLowerCase().replace(/\s/g, "-"));
    
    const today = new Date();
    let fromDate: Date;
    const toDate = today;
    
    switch (option) {
      case "Last 7 Days":
        fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 7);
        break;
      case "Last 30 Days":
        fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 30);
        break;
      case "Last 90 Days":
        fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 90);
        break;
      case "Last 1 Year":
        fromDate = new Date(today);
        fromDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        return;
    }
    
    setDateRange({ from: fromDate, to: toDate });
    if (onDateRangeChange) {
      onDateRangeChange(fromDate, toDate);
    }
    
    setIsOpen(false);
  };

  // Handle date selection in the calendar
  const handleSelect = (range: DateRange | undefined) => {
    if (!range) return;
    
    setDateRange(range);
    setActiveTab("custom");
    
    if (range.from && range.to && onDateRangeChange) {
      onDateRangeChange(range.from, range.to);
    }
  };

  // Update the display text based on the current selection
  const getDisplayText = () => {
    if (activeTab !== "custom") {
      return selectedOption;
    }
    
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`;
    }
    
    return "Select date range";
  };

  // Handle the update button click
  const handleUpdate = () => {
    if (dateRange.from && dateRange.to && onDateRangeChange) {
      onDateRangeChange(dateRange.from, dateRange.to);
    }
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div 
          className="flex items-center gap-1 cursor-pointer"
          ref={triggerRef}
        >
          <span className="text-[10px] text-[#8C9BAC]">{getDisplayText()}</span>
          <ChevronDown 
            className="w-6 h-6 text-[#8C9BAC] transition-transform"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="p-0 min-w-[340px] w-auto max-w-[98vw] h-auto rounded-2xl shadow-xl border-none bg-white mt-2"
      >
        <div className="flex flex-row h-full rounded-2xl overflow-hidden">
          {/* Left Sidebar - Quick Range Selection */}
          <div className="bg-white p-2">
            <div className="flex flex-col w-36 py-1">
              {["Custom", "Last 7 Days", "Last 30 Days", "Last 90 Days", "Last 1 Year"].map((option, idx, arr) => {
                const isActive = activeTab === option.toLowerCase().replace(/\s/g, "-");
                const spacing = idx !== arr.length - 1 ? "mb-1" : "";
                return (
                  <button
                    key={option}
                    className={cn(
                      "px-3 py-1.5 text-left font-medium text-[11px] transition-colors rounded-lg min-h-0",
                      spacing,
                      isActive
                        ? "bg-[#EAF2FF] text-[#338FFF]"
                        : "text-[#232D3A] hover:bg-gray-100"
                    )}
                    onClick={() => {
                      if (option === "Custom") {
                        setActiveTab("custom");
                      } else {
                        // Auto-select the range and update UI
                        setSelectedOption(option);
                        setActiveTab(option.toLowerCase().replace(/\s/g, "-"));
                        const today = new Date();
                        let fromDate: Date;
                        const toDate = today;
                        switch (option) {
                          case "Last 7 Days":
                            fromDate = new Date(today);
                            fromDate.setDate(today.getDate() - 7);
                            break;
                          case "Last 30 Days":
                            fromDate = new Date(today);
                            fromDate.setDate(today.getDate() - 30);
                            break;
                          case "Last 90 Days":
                            fromDate = new Date(today);
                            fromDate.setDate(today.getDate() - 90);
                            break;
                          case "Last 1 Year":
                            fromDate = new Date(today);
                            fromDate.setFullYear(today.getFullYear() - 1);
                            break;
                          default:
                            return;
                        }
                        setDateRange({ from: fromDate, to: toDate });
                        if (onDateRangeChange) {
                          onDateRangeChange(fromDate, toDate);
                        }
                      }
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel - Calendar View */}
          <div className="flex-1 p-3 bg-white">
            <div className="flex flex-col space-y-3">
              {/* Dual Calendar */}
              <div className="flex flex-row space-x-1 justify-center text-[11px]">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleSelect}
                  month={monthsToShow[0]}
                  onMonthChange={(month) => {
                    setMonthsToShow([month, addMonths(month, 1)]);
                  }}
                  numberOfMonths={1}
                  className="border rounded-md text-[11px] min-w-[180px] "
                  classNames={{
                    caption_label: "text-xs font-medium py-1",
                    head_cell: "text-[10px] w-7 h-7",
                    cell: "h-7 w-7 text-center text-[11px] p-0",
                    day: "h-7 w-7 p-0 text-[11px]",
                  }}
                  components={{
                    IconLeft: (props) => <ChevronLeft {...props} className="h-3 w-3" />, 
                    IconRight: () => null // Hide right arrow
                  }}
                />
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleSelect}
                  month={monthsToShow[1]}
                  onMonthChange={(month) => {
                    setMonthsToShow([addMonths(month, -1), month]);
                  }}
                  numberOfMonths={1}
                  className="border rounded-md text-[11px] min-w-[180px] "
                  classNames={{
                    caption_label: "text-xs font-medium py-1",
                    head_cell: "text-[10px] w-7 h-7",
                    cell: "h-7 w-7 text-center text-[11px] p-0",
                    day: "h-7 w-7 p-0 text-[11px]",
                    
                  }}
                  components={{
                    IconLeft: () => null, // Hide left arrow
                    IconRight: (props) => <ChevronRight {...props} className="h-3 w-3" />
                  }}
                />
              </div>

              {/* Date Input Fields */}
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0 sm:space-x-2 text-[11px]">
                <div className="flex items-center space-x-1 w-full">
                  <div className="w-full sm:w-1/2">
                    <div className="px-2 py-1 bg-gray-100 rounded-full">
                      {dateRange.from ? format(dateRange.from, "MMM d, yyyy") : "Start Date"}
                    </div>
                  </div>
                  <span>—</span>
                  <div className="w-full sm:w-1/2">
                    <div className="px-2 py-1 bg-gray-100 rounded-full">
                      {dateRange.to ? format(dateRange.to, "MMM d, yyyy") : "End Date"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-1 mt-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors text-[11px] min-h-0"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-[11px] min-h-0"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
