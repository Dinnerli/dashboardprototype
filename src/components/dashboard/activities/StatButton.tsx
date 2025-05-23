import { Info } from "lucide-react";
import TrendIndicator from "../common/TrendIndicator";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
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
      className={`flex items-center gap-2.5  py-2 px-3 rounded-lg cursor-pointer transition-all duration-200  ${
        isActive ? 'bg-[#F5F6F8] ' : ''
      }`}
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
          <span className={`text-sm font-medium transition-colors duration-200 truncate max-w-[120px] whitespace-nowrap ${isActive ? 'text-[#338FFF]' : 'text-[#8C9BAC]'}`}>
            {title}
          </span>
          <TooltipProvider>
            {tooltip ? (
              isMobile ? (
                <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <span
                      tabIndex={0}
                      onClick={e => {
                        e.stopPropagation();
                        setTooltipOpen(o => !o);
                      }}
                    >
                      <Info className="w-3.5 h-3.5 text-[#8C9BAC]" stroke="#8C9BAC" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" className="max-w-[180px] text-center">
                    {tooltip}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <span tabIndex={0} onClick={e => e.stopPropagation()}>
                      <Info className="w-3.5 h-3.5 text-[#8C9BAC]" stroke="#8C9BAC" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" className="max-w-[180px] text-center">
                    {tooltip}
                  </TooltipContent>
                </Tooltip>
              )
            ) : (
              <Info className="w-3.5 h-3.5 text-[#8C9BAC]" stroke="#8C9BAC" />
            )}
          </TooltipProvider>
        </div>
        <div className="flex items-center">
          <div>
            <span className="text-2xl font-bold  text-[#4F5A69]">{value}</span>
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
