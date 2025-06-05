import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar1, ChevronDown, ChevronLeft, ChevronRight, FilterIcon } from "lucide-react";
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
  defaultValue = "last-30-days", // 1. Default to 'Last 30 Days'
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const presetTabs = [
    { key: "last-7-days", label: "Last 7 Days", days: 7 },
    { key: "last-30-days", label: "Last 30 Days", days: 30 },
    { key: "last-90-days", label: "Last 90 Days", days: 90 },
    { key: "last-1-year", label: "Last 1 Year", years: 1 },
  ];

  // 1. Set default to 'Last 30 Days'
  const defaultPreset = presetTabs.find(
    (tab) => tab.key === (defaultValue.toLowerCase().replace(/\s/g, "-"))
  ) || presetTabs[1]; // fallback to 'Last 30 Days'

  const [selectedOption, setSelectedOption] = useState(defaultPreset.label);
  const [activeTab, setActiveTab] = useState<string>(
    presetTabs.some((tab) => tab.key === defaultValue.toLowerCase().replace(/\s/g, "-"))
      ? defaultValue.toLowerCase().replace(/\s/g, "-")
      : "custom"
  );
  const triggerRef = useRef<HTMLDivElement>(null);

  // Initialize with the default option's date range
  const today = new Date();
  const defaultFrom = new Date(today);
  if (defaultPreset.days) {
    defaultFrom.setDate(today.getDate() - defaultPreset.days);
  } else if (defaultPreset.years) {
    defaultFrom.setFullYear(today.getFullYear() - defaultPreset.years);
  }

  const [dateRange, setDateRange] = useState<DateRange>({
    from: defaultFrom,
    to: today,
  });

  const [monthsToShow, setMonthsToShow] = useState<Date[]>([
    new Date(),
    addMonths(new Date(), 1)
  ]);

  // Track pending custom selection before update
  const [pendingRange, setPendingRange] = useState<DateRange | null>(null);

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
    // Prevent selecting a range where from or to is in the future
    const now = new Date();
    now.setHours(0,0,0,0); // Only compare date part
    if ((range.from && range.from > now) || (range.to && range.to > now)) {
      return; // Ignore selection if any date is in the future
    }
    setPendingRange(range); // Only set pending, do not update main dateRange
    setActiveTab("custom");
    setSelectedOption("Custom");
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
    if (pendingRange && pendingRange.from && pendingRange.to) {
      setDateRange(pendingRange);
      if (onDateRangeChange) {
        onDateRangeChange(pendingRange.from, pendingRange.to);
      }
    }
    setActiveTab("custom");
    setIsOpen(false);
    setPendingRange(null);
  };

  // Cancel button resets pendingRange
  const handleCancel = () => {
    setActiveTab("custom");
    setIsOpen(false);
    setPendingRange(null);
  };

  return (
    <>
      {/* Overlay when date picker is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10 pointer-events-auto"
          // Remove onClick to prevent closing on outside click
        />
      )}
      <Popover open={isOpen} onOpenChange={(open) => {
        // Prevent closing when clicking outside (dismiss on out)
        if (!open) return; // Only allow opening, not closing
        setIsOpen(open);
      }}>
      <PopoverTrigger asChild>
        <div
          className="flex flex-row w-auto items-center justify-between gap-2 min-w-80 px-6 py-3 cursor-pointer bg-transparent border-none outline-none p-0" // match FilterDropdown style
          ref={triggerRef}
        >
          <div>
            {/* 3. Only show date range if custom, otherwise show label */}
            <span className="text-base text-[#233143] font-semibold">{getDisplayText()}</span>
          </div>
          <div className='border-l pl-2'>
            <Calendar1 className="w-5 h-5 text-[#4f5a69] " />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="p-5 gap-5 flex flex-row min-w-[340px] w-auto max-w-[98vw] h-auto rounded-xl shadow-xl border-none bg-white mt-5"
      >
        {/* Left Sidebar - Quick Range Selection */}
        <div className="bg-white w-52">
          <div className="flex flex-col  gap-2.5">
            {["Custom", ...presetTabs.map((tab) => tab.label)].map((option, idx, arr) => {
              const isActive = activeTab === option.toLowerCase().replace(/\s/g, "-");
              const spacing = idx !== arr.length - 1 ? "mb-1" : "";
              return (
                <button
                  key={option}
                  className={cn(
                    "px-5 py-1.5 text-left text-base font-semibold transition-colors rounded-md min-h-0",
                    spacing,
                    isActive
                      ? "bg-[#F2F3F5] text-[#338FFF]"
                      : "text-[#4F5A69] hover:bg-gray-100"
                  )}
                  onClick={() => {
                    if (option === "Custom") {
                      setActiveTab("custom");
                      setSelectedOption("Custom");
                    } else {
                      const tab = presetTabs.find((t) => t.label === option);
                      if (!tab) return;
                      setSelectedOption(tab.label);
                      setActiveTab(tab.key);
                      const today = new Date();
                      const fromDate = new Date(today);
                      if (tab.days) {
                        fromDate.setDate(today.getDate() - tab.days);
                      } else if (tab.years) {
                        fromDate.setFullYear(today.getFullYear() - tab.years);
                      }
                      setDateRange({ from: fromDate, to: today });
                      if (onDateRangeChange) {
                        onDateRangeChange(fromDate, today);
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
        <div className="w-px bg-gray-200 mx-2"></div>
        {/* Right Panel - Calendar View */}
        <div className="flex-1 bg-white">
          <div className="flex flex-col">
            {/* Dual Calendar */}
            <div className="flex flex-row p-2.5 space-y-2.5 justify-center text-xs">
              <Calendar
                mode="range"
                selected={pendingRange || dateRange}
                onSelect={handleSelect}
                month={monthsToShow[0]}
                onMonthChange={(month) => {
                  // Prevent navigating to future months
                  const now = new Date();
                  now.setHours(0,0,0,0);
                  const nextMonth = addMonths(month, 1);
                  if (month > now) return;
                  if (nextMonth > now) {
                    setMonthsToShow([month, now]);
                  } else {
                    setMonthsToShow([month, addMonths(month, 1)]);
                  }
                }}
                numberOfMonths={2}
                className="text-xs min-w-[180px] "
                classNames={{
                  caption_label: "text-xs font-medium text-[#4F5A69] py-1",
                  head_cell: "text-[10px] w-7 h-7 text-[#4F5A69] font-medium",
                  cell: "h-7 w-7 text-center text-[11px] p-0",
                  day: "h-7 w-7 p-0 text-xs text-[#4F5A69] font-medium",
                }}
                // Disable all future dates
                disabled={{ after: new Date() }}
                modifiers={{
                  future: (date) => {
                    const today = new Date();
                    today.setHours(0,0,0,0);
                    return date > today;
                  }
                }}
                modifiersClassNames={{
                  future: "line-through text-gray-400 cursor-not-allowed"
                }}
                components={{
                  IconLeft: (props) => <ChevronLeft {...props} className="h-3 w-3" />,
                  IconRight: (props) => <ChevronRight {...props} className="h-3 w-3" />,
                }}
              />
              
            </div>

            {/* Date Input Fields */}
            <div className="flex flex-col sm:flex-row justify-between items-center p-2.5 space-y-1 sm:space-y-0 sm:space-x-2 text-[11px]">
              <div className="flex items-center space-x-1 w-full">
                <div className="w-full sm:w-1/2">
                  <div className="px-2 py-1 bg-gray-100 rounded-lg border">
                    <div className="text-sm py-1 px-2">
                       {dateRange.from ? format(dateRange.from, "MMM d, yyyy") : "Start Date"}
                    </div>
                   
                  </div>
                </div>
                <span>—</span>
                <div className="w-full sm:w-1/2">
                  <div className="px-2 py-1 bg-gray-100 rounded-lg border">
                    <div className="text-sm py-1 px-2">
                      {dateRange.to ? format(dateRange.to, "MMM d, yyyy") : "End Date"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-2">
              <button
                onClick={handleCancel}
                className="px-7 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors text-base min-h-0"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-7 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-base min-h-0"
              >
                Update
              </button>
            </div>
          </div>
        </div>

      </PopoverContent>
    </Popover>
    </>
  );
};

export default DateRangePicker;
