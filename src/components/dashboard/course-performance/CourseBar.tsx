
import React from "react";

export type CourseBarProps = {
  name: string;
  completedPercentage: number;
  inProgressPercentage: number;
};

const CourseBar = ({ name, completedPercentage, inProgressPercentage }: CourseBarProps) => {
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
          className="h-full bg-[#338FFF] rounded-[10px]" 
          style={{ width: `${completedPercentage}%` }}
        ></div>
        <div 
          className="h-full bg-[#CDE4FF] rounded-[5px]" 
          style={{ width: `${inProgressPercentage}%` }}
        ></div>
        <div className="flex-1 h-full bg-transparent"></div>
      </div>
    </div>
  );
};

export default CourseBar;
