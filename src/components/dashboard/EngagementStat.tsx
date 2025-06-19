import React from "react";
import { Info } from "lucide-react";
import TrendIndicator from "./common/TrendIndicator";
import InfoTooltip from "../ui/InfoTooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface EngagementStatProps {
  title: string;
  value: string | number;
  percentage: string;
  tooltip: string;
  isPositive: boolean;
  isActive: boolean;
  onClick: () => void;
}

const EngagementStat: React.FC<EngagementStatProps> = ({
  title,
  value,
  percentage,
  tooltip,
  isPositive,
  isActive,
  onClick,
}) => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex items-center gap-2.5 py-2.5 px-1.5 rounded-sm cursor-pointer transition-all duration-200 w-auto min-w-fit whitespace-nowrap  
        ${        isActive ? "bg-[#F5F6F8] " : ""      }
                  ${isMobile ? 'border border-[#F5F6F8]' : ''}
                  `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center w-2.5">
        <div
          className={`w-0.5 h-[35px] transition-colors duration-200 ${
            isActive ? "bg-[#338FFF]" : "bg-[#CDD1D7]"
          }`}
        />
      </div>      <div className="flex flex-col px-2.5 min-w-0">
        <div className="flex items-center gap-2.5 ">
          <span
            className={`font-semibold transition-colors duration-200 truncate ${
              isActive ? "text-[#338FFF]" : "text-[#8C9BAC]"
            } ${isMobile ? "text-sm" : "text-base"}`}
          >
            {title}
          </span>
          <InfoTooltip tooltip={tooltip} iconProps={{ className: 'w-3 h-3 text-[#8C9BAC]' }} />
        </div>        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-shrink-0">
            <span className={`font-bold text-[#4F5A69] whitespace-nowrap ${isMobile ? 'text-lg' : 'text-2xl'}`}>{value}</span>
          </div>
          <div className="w-[66px] flex justify-end items-center flex-shrink-0">
            <TrendIndicator value={percentage} isPositive={isPositive} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementStat;
