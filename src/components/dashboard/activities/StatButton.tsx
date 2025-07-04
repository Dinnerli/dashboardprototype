import { Info } from "lucide-react";
import TrendIndicator from "../common/TrendIndicator";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import React, { useState, useEffect } from "react";

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
  }, []);  return (
    <div 
      className={`flex items-center gap-2.5 py-2 px-3 sm:py-1 sm:px-2 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap min-w-fit
        ${isActive ? 'bg-[#F5F6F8] ' : ''}
        ${isMobile ? 'border border-[#F5F6F8]' : 'border-none'}
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center p-2">        <div 
          className={`border-2 h-8 p-0 transition-colors duration-200 ${
          isActive ? 'border-[#338FFF]' : 'border-[#F2F3F5]'
          }`}
        />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-2.5">
          <span className={`font-medium transition-colors duration-200 ${
          isActive ? 'text-[#338FFF]' : 'text-[#8C9BAC]'
          } ${isMobile ? 'text-xs' : 'text-sm'}`}>
          {title}
          </span>
          {tooltip ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span tabIndex={0} onClick={e => e.stopPropagation()} className='cursor-pointer'>
                  <Info className='w-3.5 h-3.5 text-[#8C9BAC]' stroke='#8C9BAC' />
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" className="max-w-[180px] h-auto text-center break-words whitespace-pre-line">
                {tooltip}
              </TooltipContent>
            </Tooltip>
            
          ) : (
            <Info className='w-3.5 h-3.5 text-[#8C9BAC]' stroke='#8C9BAC' />
          )}
        </div>
        <div className="flex items-center gap-3 justify-between min-w-0">
          <span className={`font-bold text-[#4F5A69] ${isMobile ? 'text-lg' : 'text-2xl'} flex-shrink-0`}>
            {value}
          </span>
          <div className="flex-shrink-0">
            <TrendIndicator value={percentage} isPositive={isPositive} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatButton;
