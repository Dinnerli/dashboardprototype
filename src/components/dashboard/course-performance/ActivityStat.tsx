import React from "react";
import { Info } from "lucide-react";
import TrendIndicator from "../common/TrendIndicator";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import InfoTooltip from "@/components/ui/InfoTooltip";

type ActivityStatProps = { 
  title: string; 
  value: string; 
  percentage: string;
  isActive: boolean;
  isSelected: boolean;
  isPositive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  tooltip?: string;
};

const ActivityStat = ({ 
  title, 
  value, 
  percentage, 
  isActive,
  isSelected,
  isPositive,
  onClick,
  icon,
  tooltip
}: ActivityStatProps) => {

  // Determine vertical line color based on title
  const getLineColor = (title: string) => {
    switch (title.toLowerCase()) {
      case "completed":
      case "incomplete":
        return "bg-[#CDE4FF]"; // light color
      case "passed":
      case "failed":
        return "bg-[#338FFF]"; // dark color
      default:
        return "bg-[#CDE4FF]";
    }
  };

  return (
    <div
      className="grid flex-1 grid-cols-[18px_1fr_auto_auto] items-center gap-x-2 p-2.5 rounded-lg transition-colors"
      onClick={onClick}
    >
      {/* Vertical colored line */}
      <div className="flex items-center justify-center">
        <div className={`w-0.5 h-[35px] ${getLineColor(title)}`}></div>
      </div>
      {/* Status label */}
      <div className="flex items-center gap-1">
        <span className="text-sm sm:text-base font-semibold text-[#8C9BAC]">{title}</span>
        {tooltip && (
          <InfoTooltip tooltip={tooltip} iconProps={{ className: 'w-3 h-3 text-[#8C9BAC]' }} />
        )}
      </div>
      {/* Value */}
      <span className="text-xl sm:text-2xl font-bold text-[#4F5A69] text-right min-w-[32px]">{value}</span>
      {/* Trend */}
      <div className="flex items-center justify-end min-w-[48px]">
        <TrendIndicator value={percentage} isPositive={isPositive} />
      </div>
    </div>
  );
};

export default ActivityStat;
