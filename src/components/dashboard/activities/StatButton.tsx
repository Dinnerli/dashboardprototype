import { Info } from "lucide-react";
import TrendIndicator from "../common/TrendIndicator";
import InfoTooltip from "@/components/ui/InfoTooltip";
import React, { useState, useEffect } from "react";  // added imports for state and effect

type StatButtonProps = { 
  title: string; 
  value: string; 
  percentage: string;
  isActive: boolean;
  isPositive: boolean;
  onClick: () => void;
  tooltip?: string;
};

const StatButton = ({ 
  title, 
  value, 
  percentage, 
  isActive,
  isPositive,
  onClick,
  tooltip
}: StatButtonProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const touch = typeof navigator !== "undefined" &&
      (navigator.maxTouchPoints > 0 || 'ontouchstart' in window);
    setIsMobile(touch);
  }, []);

  return (
    <div 
      className={`flex items-center gap-2.5 py-2 px-3 sm:py-1 sm:px-2  rounded-lg cursor-pointer transition-all duration-200 
        ${isActive ? 'bg-[#F5F6F8] ' : ''}
        ${isMobile ? 'border border-[#F5F6F8]' : 'border-none'}
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center p-2">
      <div 
        className={`border b-2 h-8 p-0 transition-colors duration-200 ${
        isActive ? 'border-[#338FFF]' : 'border-[#F2F3F5]'
        }`}
      />
      </div>
      <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-2.5 ">
        <span className={`font-medium transition-colors duration-200 truncate max-w-[120px] whitespace-nowrap ${
        isActive ? 'text-[#338FFF]' : 'text-[#8C9BAC]'
        } ${isMobile ? 'text-xs' : 'text-sm'}`}>
        {title}
        </span>
        <InfoTooltip
        tooltip={tooltip}
        delayDuration={0}
        iconProps={{ className: 'w-3.5 h-3.5 text-[#8C9BAC]', stroke: '#8C9BAC' }}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
        <span className={`font-bold text-[#4F5A69] ${isMobile ? 'text-lg' : 'text-2xl'}`}>
          {value}
        </span>
        </div>
        <div className="w-[66px] flex justify-end items-center">
        <TrendIndicator value={percentage} isPositive={isPositive} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default StatButton;
