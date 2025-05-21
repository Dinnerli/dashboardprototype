import { Info } from "lucide-react";
import TrendIndicator from "../common/TrendIndicator";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type ActivityStatProps = { 
  title: string; 
  value: string; 
  percentage: string;
  isActive: boolean;
  isPositive: boolean;
  onClick: () => void;
  tooltip?: string;
};

const ActivityStat = ({ 
  title, 
  value, 
  percentage, 
  isActive,
  isPositive,
  onClick,
  tooltip
}: ActivityStatProps) => {
  return (
    <div 
      className={`flex items-center gap-2.5 p-1.5 px-2 rounded-lg cursor-pointer transition-all duration-200  ${
        isActive ? 'bg-[#F5F6F8] ' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center p-2.5">
        <div 
          className={`w-0.5 h-[35px] transition-colors duration-200 ${
            isActive ? 'bg-[#338FFF]' : 'bg-[#CDD1D7]'
          }`}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5 ">
          <span className={`text-sm font-medium transition-colors duration-200 ${
            isActive ? 'text-[#338FFF]' : 'text-[#8C9BAC]'
          }`}>
            {title}
          </span>
          {tooltip ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span tabIndex={0} onClick={e => e.stopPropagation()}>
                  <Info className="w-4 h-4 text-[#8C9BAC] cursor-help" stroke="#8C9BAC" />
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Info className="w-4 h-4 text-[#8C9BAC]" stroke="#8C9BAC" />
          )}
        </div>
        <div className="flex items-center px-2.5">
          <div>
            <span className="text-lg font-bold text-[#4F5A69]">{value}</span>
          </div>
          <div className="w-[66px] flex justify-end items-center">
            <TrendIndicator value={percentage} isPositive={isPositive} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityStat;
