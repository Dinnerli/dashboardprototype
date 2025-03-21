
import React from "react";
import { Info } from "lucide-react";
import StatIndicator from "./StatIndicator";

type ActivityStatProps = { 
  title: string; 
  value: string; 
  percentage: string;
  isActive: boolean;
  icon?: React.ReactNode;
};

const ActivityStat = ({ 
  title, 
  value, 
  percentage, 
  isActive,
  icon
}: ActivityStatProps) => {
  const borderColor = isActive ? "#338FFF" : "#CDE4FF";
  
  return (
    <div className="flex items-center gap-5 p-5 flex-1">
      <div className="flex p-2.5 flex-col justify-center items-center">
        <div className="w-[2px] h-[35px]" style={{ backgroundColor: borderColor }}></div>
      </div>
      <div className="flex w-full items-center">
        <div className="flex px-2.5 items-center gap-2.5 flex-1">
          <span className="text-base text-[#8C9BAC] font-semibold">
            {title}
          </span>
          <Info className="w-4 h-4 text-[#8C9BAC]" />
        </div>
        <div className="flex px-2.5 justify-end items-center gap-2.5 flex-1">
          <span className="text-2xl font-bold text-[#4F5A69]">{value}</span>
          <StatIndicator value={percentage} isPositive={true} />
        </div>
      </div>
    </div>
  );
};

export default ActivityStat;
