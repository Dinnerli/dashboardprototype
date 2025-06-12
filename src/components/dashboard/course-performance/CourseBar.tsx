import React, { useEffect, useState } from "react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export type CourseBarProps = {
  name: string;
  passedPercentage: number;
  completedButNotPassedPercentage: number;
  notCompletedPercentage: number;
  onClick?: (courseName: string) => void;
  isSelected?: boolean;
  isUnderperforming?: boolean; // New prop to indicate underperforming tab
};

const CourseBar = ({ 
  name, 
  passedPercentage, 
  completedButNotPassedPercentage, 
  notCompletedPercentage,
  onClick,
  isSelected = false,
  isUnderperforming = false
}: CourseBarProps) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after a small delay to ensure the component is mounted
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick(name);
    }
  };  return (
    <TooltipProvider>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 w-full">
        {/* Name section */}
        <div className="flex w-full sm:w-[100px] justify-start sm:justify-end items-center gap-[5px]">
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div 
                className={`w-full sm:w-[90px] text-left sm:text-right text-[10px] font-medium truncate cursor-pointer ${
                  isSelected ? 'text-[#338FFF]' : 'text-[#4F5A69]'
                }`}
                onClick={handleClick}
              >
                {name}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="max-w-[200px] text-center">
              {name}
            </TooltipContent>
          </Tooltip>
          <div className="hidden sm:block w-[4px] h-[1px] bg-[#4F5A69]"></div>
        </div>        {/* Bar chart section */}
        <div className="flex h-[10px] min-h-[10px] items-center gap-[2px] w-full flex-1">
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div 
                className="relative h-full w-full bg-[#E5E7EA] rounded-[5px] overflow-hidden flex cursor-pointer transition-all duration-200 hover:opacity-80"
                onClick={handleClick}
              >                {/* First segment - Primary Blue: Passed (performing) or Failed (underperforming) */}
                <div
                  className={`h-full transition-[width] duration-1000 ease-out rounded-l-[5px] ${
                    isSelected ? 'bg-[#338FFF]' : 'bg-[#B0B6BE]'
                  }`}
                  style={{
                    width: isAnimated ? `${isUnderperforming ? completedButNotPassedPercentage : passedPercentage}%` : '0%',
                    transitionDelay: '0.1s',
                  }}
                  role="progressbar"
                  aria-label={isUnderperforming ? `Failed: ${completedButNotPassedPercentage.toFixed(1)}%` : `Passed: ${passedPercentage.toFixed(1)}%`}
                ></div>
                
                {/* Second segment - Light Blue: Completed but not passed (performing) or Completed but not failed (underperforming) */}
                <div
                  className={`h-full transition-[width] duration-1000 ease-out ${
                    isSelected ? 'bg-[#CDE4FF]' : 'bg-[#D1D5DB]'
                  }`}
                  style={{
                    width: isAnimated ? `${isUnderperforming ? passedPercentage : completedButNotPassedPercentage}%` : '0%',
                    transitionDelay: '0.2s',
                  }}
                  role="progressbar"
                  aria-label={isUnderperforming ? `Completed but not failed: ${passedPercentage.toFixed(1)}%` : `Completed but not passed: ${completedButNotPassedPercentage.toFixed(1)}%`}
                ></div>
                
                {/* Not completed segment - Gray */}
                <div
                  className={`h-full transition-[width] duration-1000 ease-out rounded-r-[5px] ${
                    isSelected ? 'bg-[#E5E7EB]' : 'bg-[#E5E7EB]'
                  }`}
                  style={{
                    width: isAnimated ? `${notCompletedPercentage}%` : '0%',
                    transitionDelay: '0.3s',
                  }}
                  role="progressbar"
                  aria-label={`Not completed: ${notCompletedPercentage.toFixed(1)}%`}
                ></div>
              </div>
            </TooltipTrigger>            <TooltipContent side="top" align="center" className="text-center">
              <div className="space-y-2">
                <div className="font-medium">{name}</div>
                <div className="space-y-1 text-sm">
                  {isUnderperforming ? (
                    <>
                      <div className="flex justify-between gap-4">
                        <span>Failed:</span>
                        <span className="font-medium">{completedButNotPassedPercentage.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Completed but not failed:</span>
                        <span className="font-medium">{passedPercentage.toFixed(1)}%</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between gap-4">
                        <span>Passed:</span>
                        <span className="font-medium">{passedPercentage.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Completed but not passed:</span>
                        <span className="font-medium">{completedButNotPassedPercentage.toFixed(1)}%</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between gap-4">
                    <span>Not completed:</span>
                    <span className="font-medium">{notCompletedPercentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
          <div className="flex-1 h-full bg-transparent"></div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CourseBar;
