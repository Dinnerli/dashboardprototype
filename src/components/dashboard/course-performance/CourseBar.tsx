import React, { useEffect, useState } from "react";

export type CourseBarProps = {
  name: string;
  completedPercentage: number;
  inProgressPercentage: number;
};

const CourseBar = ({ name, completedPercentage, inProgressPercentage }: CourseBarProps) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after a small delay to ensure the component is mounted
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center gap-1 w-full">
      <div className="flex w-[100px] justify-end items-center gap-[5px]">
        <div className="w-[90px] text-right text-[10px] text-[#4F5A69] font-normal truncate">
          {name}
        </div>
        <div className="w-[4px] h-[1px] bg-[#4F5A69]"></div>
      </div>
      <div className="flex h-[10px] items-center gap-[2px] flex-1">
        <div 
          className="relative h-full w-full bg-[#CDE4FF] rounded-[5px] overflow-hidden transition-all duration-1000 ease-out"
        >
          <div
            className="absolute left-0 top-0 h-full bg-[#338FFF] rounded-[10px] transition-all duration-1000 ease-out"
            style={{
              width: isAnimated ? `${completedPercentage}%` : '0%',
              transitionDelay: '0.2s',
            }}
          ></div>
        </div>
        <div className="flex-1 h-full bg-transparent"></div>
      </div>
    </div>
  );
};

export default CourseBar;
