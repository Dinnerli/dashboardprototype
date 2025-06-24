import * as React from "react";
import { useState, useEffect } from "react";
import { format, addMonths } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Calendar1 } from "lucide-react";

interface MobileDateRangePickerProps {
  onDateRangeChange?: (startDate: Date, endDate: Date) => void;
  defaultValue?: string;
  value?: DateRange;
}

type DateRange = {
  from: Date;
  to: Date | undefined;
};

const presetTabs = [
  { key: "last-7-days", label: "Last 7 Days", days: 7 },
  { key: "last-30-days", label: "Last 30 Days", days: 30 },
  { key: "last-90-days", label: "Last 90 Days", days: 90 },
  { key: "last-1-year", label: "Last 1 Year", years: 1 },
];

const MobileDateRangePicker = ({
  onDateRangeChange,
  defaultValue = "last-30-days",
  value,
}: MobileDateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const defaultPreset =
    presetTabs.find(
      (tab) => tab.key === defaultValue.toLowerCase().replace(/\s/g, "-")
    ) || presetTabs[1];

  const [selectedOption, setSelectedOption] = useState(defaultPreset.label);
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
    addMonths(new Date(), 1),
  ]);

  // If value prop is provided, use it as the source of truth
  useEffect(() => {
    if (value && value.from && value.to) {
      setDateRange(value);
      setSelectedOption("Custom");
    }
  }, [value]);

  // Handle quick select
  const handleQuickSelect = (tab: typeof presetTabs[number]) => {
    setSelectedOption(tab.label);
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
    setIsOpen(false);
  };

  // Handle calendar select
  const handleSelect = (range: DateRange | undefined) => {
    if (!range) return;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if ((range.from && range.from > now) || (range.to && range.to > now)) {
      return;
    }
    if (range.from && range.to) {
      setDateRange(range);
      if (onDateRangeChange) {
        onDateRangeChange(range.from, range.to);
      }
      setIsOpen(false);
    }
  };

  // Display text
  const getDisplayText = () => {
    if (selectedOption) return selectedOption;
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`;
    }
    return "Select date range";
  };

  return (
    <>
      <div
        className="flex flex-row w-full items-center justify-between gap-2 px-4 py-3 cursor-pointer bg-white border rounded-lg shadow-sm"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-base text-[#233143] font-semibold">{getDisplayText()}</span>
        <Calendar1 className="w-5 h-5 text-[#4f5a69]" />
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-4 w-full max-w-sm rounded-xl flex flex-col min-h-[80vh] justify-between">
          <div>
            {/* Quick Access 2x2 Grid - Desktop style buttons */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {presetTabs.map((tab) => (
                <button
                  key={tab.key}
                  className={cn(
                    "px-5 py-1.5 text-left text-base font-semibold transition-colors rounded-md min-h-0 w-full shadow-none border-none",
                    selectedOption === tab.label
                      ? "bg-[#F2F3F5] text-[#338FFF]"
                      : "text-[#4F5A69] hover:bg-gray-100 bg-white"
                  )}
                  onClick={() => handleQuickSelect(tab)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Calendar 1 */}
            <div className="mb-2 w-full flex justify-center items-center">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleSelect}
                month={monthsToShow[0]}
                onMonthChange={(month) => {
                  const now = new Date();
                  now.setHours(0, 0, 0, 0);
                  if (month > now) return;
                  setMonthsToShow([month, monthsToShow[1]]);
                }}
                numberOfMonths={2}
                className="text-xs w-auto min-w-0 max-w-[420px] mx-auto"
                classNames={{
                  caption_label: "text-xs font-medium text-[#4F5A69] py-1",
                  head_cell: "text-[10px] w-7 h-7 text-[#4F5A69] font-medium",
                  cell: "h-7 w-7 text-center text-[11px] p-0",
                  day: "h-7 w-7 p-0 text-xs text-[#4F5A69] font-medium",
                }}
                disabled={{ after: new Date() }}
                modifiers={{
                  future: (date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date > today;
                  },
                }}
                modifiersClassNames={{
                  future: "line-through text-gray-400 cursor-not-allowed",
                }}
              />
            </div>
          </div>
          {/* Bottom Action Buttons - Desktop style */}
          <div className="flex w-full gap-3 mt-4">
            <button
              className="flex-1 px-7 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors text-base min-h-0 bg-white"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button
              className="flex-1 px-7 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-base min-h-0"
              onClick={() => setIsOpen(false)}
            >
              Done
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileDateRangePicker;
