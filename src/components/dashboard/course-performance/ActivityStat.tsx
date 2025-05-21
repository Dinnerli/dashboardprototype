import React from "react";
import { Info } from "lucide-react";
import TrendIndicator from "../common/TrendIndicator";

type ActivityStatProps = { 
  title: string; 
  value: string; 
  percentage: string;
  isActive: boolean;
  isSelected: boolean;
  isPositive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
};

const ActivityStat = ({ 
  title, 
  value, 
  percentage, 
  isActive,
  isSelected,
  isPositive,
  onClick,
  icon
}: ActivityStatProps) => {
  const borderColor = isActive ? "#338FFF" : "#CDE4FF";
  
  return (
    <div 
      className={`flex items-center gap-5 p-5 flex-1 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]
        ${isSelected 
          ? 'border-2 border-[#338FFF] shadow-md shadow-[#338FFF]/20' 
          : 'hover:border hover:border-[#338FFF]/50 hover:shadow-sm'
        }`}
      onClick={onClick}
    >
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r transition-colors duration-300
        ${isSelected ? 'bg-[#338FFF]' : 'bg-transparent'}`}
      ></div>
      <div className="flex w-full items-center">
        <div className="flex px-2.5 items-center gap-2.5 flex-1">
          <span className={`font-medium transition-colors duration-300
            ${isSelected ? 'text-[#338FFF]' : 'text-[#8C9BAC]'}`}
          >
            {title}
          </span>
          <Info className={`w-4 h-4 transition-colors duration-300
            ${isSelected ? 'text-[#338FFF]' : 'text-[#8C9BAC]'}`}
          />
        </div>
        <div className="flex px-2.5 justify-end items-center gap-2.5 flex-1">
          <span className="text-2xl font-bold text-[#4F5A69]">{value}</span>
          <TrendIndicator value={percentage} isPositive={isPositive} />
        </div>
      </div>
    </div>
  );
};

export default ActivityStat;
