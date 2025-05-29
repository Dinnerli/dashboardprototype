import React, { useEffect, useState } from "react";

export type CourseBarProps = {
  name: string;
  passedPercentage: number;
  completedButNotPassedPercentage: number;
  notCompletedPercentage: number;
  onClick?: (courseName: string) => void;
  isSelected?: boolean;
};

const CourseBar = ({ 
  name, 
  passedPercentage, 
  completedButNotPassedPercentage, 
  notCompletedPercentage,
  onClick,
  isSelected = false
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
  };
  return (
   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 w-full">
  {/* Name section */}
  <div className="flex w-full sm:w-[100px] justify-start sm:justify-end items-center gap-[5px]">
    <div 
      className={`w-full sm:w-[90px] text-left sm:text-right text-[10px] font-medium truncate cursor-pointer ${
        isSelected ? 'text-[#338FFF]' : 'text-[#4F5A69]'
      }`}
      onClick={handleClick}
    >
      {name}
    </div>
    <div className="hidden sm:block w-[4px] h-[1px] bg-[#4F5A69]"></div>
  </div>{/* Bar chart section */}
  <div className="flex h-[10px] min-h-[10px] items-center gap-[2px] w-full flex-1">
    <div 
      className="relative h-full w-full bg-[#E5E7EA] rounded-[5px] overflow-hidden flex cursor-pointer transition-all duration-200 hover:opacity-80"
      onClick={handleClick}
    >      {/* Passed segment - Dark Blue or inactive gray */}
      <div
        className={`h-full transition-[width] duration-1000 ease-out rounded-l-[5px] ${
          isSelected ? 'bg-[#338FFF]' : 'bg-[#B0B6BE]'
        }`}
        style={{
          width: isAnimated ? `${passedPercentage}%` : '0%',
          transitionDelay: '0.1s',
        }}
        title={`Passed: ${passedPercentage.toFixed(1)}%`}
        role="progressbar"
        aria-label={`Passed: ${passedPercentage.toFixed(1)}%`}
      ></div>
      {/* Completed but not passed segment - Light Blue or inactive gray */}
      <div
        className={`h-full transition-[width] duration-1000 ease-out ${
          isSelected ? 'bg-[#CDE4FF]' : 'bg-[#D1D5DB]'
        }`}
        style={{
          width: isAnimated ? `${completedButNotPassedPercentage}%` : '0%',
          transitionDelay: '0.2s',
        }}
        title={`Completed but not passed: ${completedButNotPassedPercentage.toFixed(1)}%`}
        role="progressbar"
        aria-label={`Completed but not passed: ${completedButNotPassedPercentage.toFixed(1)}%`}
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
        title={`Not completed: ${notCompletedPercentage.toFixed(1)}%`}
        role="progressbar"
        aria-label={`Not completed: ${notCompletedPercentage.toFixed(1)}%`}
      ></div>
    </div>
    <div className="flex-1 h-full bg-transparent"></div>
  </div>
</div>

  );
};

export default CourseBar;
