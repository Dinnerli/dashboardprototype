import React, { useEffect, useState } from "react";

export type CourseBarProps = {
  name: string;
  passedPercentage: number;
  completedButNotPassedPercentage: number;
  notCompletedPercentage: number;
};

const CourseBar = ({ name, passedPercentage, completedButNotPassedPercentage, notCompletedPercentage }: CourseBarProps) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after a small delay to ensure the component is mounted
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 w-full">
  {/* Name section */}
  <div className="flex w-full sm:w-[100px] justify-start sm:justify-end items-center gap-[5px]">
    <div className="w-full sm:w-[90px] text-left sm:text-right text-[10px] text-[#4F5A69] font-medium truncate">
      {name}
    </div>
    <div className="hidden sm:block w-[4px] h-[1px] bg-[#4F5A69]"></div>
  </div>
  {/* Bar chart section */}
  <div className="flex h-[10px] min-h-[10px] items-center gap-[2px] w-full flex-1">
    <div className="relative h-full w-full bg-[#E5E7EB] rounded-[5px] overflow-hidden flex">      {/* Passed segment - Dark Blue */}
      <div
        className="h-full bg-[#338FFF] transition-all duration-1000 ease-out rounded-l-[5px]"
        style={{
          width: isAnimated ? `${passedPercentage}%` : '0%',
          transitionDelay: '0.1s',
        }}
        title={`Passed: ${passedPercentage.toFixed(1)}%`}
        role="progressbar"
        aria-label={`Passed: ${passedPercentage.toFixed(1)}%`}
      ></div>
      {/* Completed but not passed segment - Light Blue */}
      <div
        className="h-full bg-[#CDE4FF] transition-all duration-1000 ease-out"
        style={{
          width: isAnimated ? `${completedButNotPassedPercentage}%` : '0%',
          transitionDelay: '0.2s',
        }}
        title={`Completed but not passed: ${completedButNotPassedPercentage.toFixed(1)}%`}
        role="progressbar"
        aria-label={`Completed but not passed: ${completedButNotPassedPercentage.toFixed(1)}%`}
      ></div>
      {/* Not completed segment - Gray (background handles this) */}
      <div
        className="h-full bg-[#E5E7EB] transition-all duration-1000 ease-out rounded-r-[5px]"
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
