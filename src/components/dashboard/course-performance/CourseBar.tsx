
import React from "react";

export type CourseBarProps = {
  name: string;
  completedPercentage: number;
  inProgressPercentage: number;
};

const CourseBar = ({ name, completedPercentage, inProgressPercentage }: CourseBarProps) => {
  return (
    <div className="flex items-center gap-2 my-3 w-full">
      <div className="flex min-w-[120px] justify-end items-center gap-1">
        <div className="w-full text-right text-xs text-[#4F5A69] font-poppins">{name}</div>
        <div className="w-[4px] h-[1px] bg-[#4F5A69]"></div>
      </div>
      <div className="flex h-[8px] justify-start items-center flex-1">
        <div 
          className="h-full bg-[#338FFF] rounded-l-sm" 
          style={{ width: `${completedPercentage}%` }}
        ></div>
        <div 
          className="h-full bg-[#CDE4FF] rounded-r-sm" 
          style={{ width: `${inProgressPercentage}%` }}
        ></div>
        <div className="flex-1 h-full bg-transparent"></div>
      </div>
    </div>
  );
};

export default CourseBar;
