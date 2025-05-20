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
    <div className="relative">
      {/* Trigger button */}
      <div 
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-[10px] text-[#8C9BAC]">{getDisplayText()}</span>
        <ChevronDown 
          className="w-6 h-6 text-[#8C9BAC] transition-transform"
        />
      </div>
      
      {/* Date Range Picker Dialog */}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="p-0 sm:max-w-[850px] h-auto">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left Sidebar - Quick Range Selection */}
            <div className="border-r border-gray-200 bg-white">
              <div className="flex flex-col w-full md:w-48">
                {["Custom", "Last 7 Days", "Last 30 Days", "Last 90 Days", "Last 1 Year"].map((option) => (
                  <button
                    key={option}
                    className={cn(
                      "px-4 py-3 text-left font-medium text-sm transition-colors",
                      activeTab === option.toLowerCase().replace(/\s/g, "-")
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => {
                      if (option === "Custom") {
                        setActiveTab("custom");
                      } else {
                        handleQuickSelect(option);
                      }
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Panel - Calendar View */}
            <div className="flex-1 p-4 bg-white">
              <div className="flex flex-col space-y-4">
                {/* Dual Calendar */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={handleSelect}
                    month={monthsToShow[0]}
                    onMonthChange={(month) => {
                      setMonthsToShow([month, addMonths(month, 1)]);
                    }}
                    numberOfMonths={1}
                    className="border rounded-md"
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
                    className="border rounded-md"
                  />
                </div>

                {/* Date Input Fields */}
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-4 w-full">
                    <div className="w-full sm:w-1/2">
                      <div className="px-4 py-2 bg-gray-100 rounded-full text-sm">
                        {dateRange.from ? format(dateRange.from, "MMM d, yyyy") : "Start Date"}
                      </div>
                    </div>
                    <span>—</span>
                    <div className="w-full sm:w-1/2">
                      <div className="px-4 py-2 bg-gray-100 rounded-full text-sm">
                        {dateRange.to ? format(dateRange.to, "MMM d, yyyy") : "End Date"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                  <DialogClose asChild>
                    <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors">
                      Cancel
                    </button>
                  </DialogClose>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DateRangePicker;
