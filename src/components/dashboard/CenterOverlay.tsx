import React from 'react'
import InfoTooltip from '../ui/InfoTooltip';
import TrendIndicator from './common/TrendIndicator';



export const CenterOverlay = ({
  title,
  tooltip,
  value,
  percentage,
  trendValue,
  isPositiveTrend
}: {
  title: string;
  tooltip: string;
  value: number;
  percentage: number;
  trendValue: string;
  isPositiveTrend: boolean;
}) => {
   
  // Ensure trendValue is a string with “%” if necessary
  const parsedTrendValue = typeof trendValue === 'string' ? trendValue : `${trendValue}%`;

  return (
    <div className="absolute top-[36%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
      <div className="flex justify-center items-center space-x-1">
        <span className="text-base font-semibold text-[#388fff]">
          {title}
        </span>
        <div className="pointer-events-auto">
          <InfoTooltip
            tooltip={tooltip}
            delayDuration={0}
            iconProps={{
              className: 'w-3.5 h-3.5 text-[#8C9BAC]',
              stroke: '#8C9BAC',
            }}
          />
        </div>
      </div>
      <div className="mt-1 text-4xl font-bold text-[#4F5A69]">
        {value}
      </div>
      <div className="mt-1 flex justify-center gap-2 items-center space-x-1">
        <span className="text-lg font-bold text-[#4F5A69]">
          {percentage}%
        </span>
        <TrendIndicator value={parsedTrendValue} isPositive={isPositiveTrend} />
      </div>
      
    </div>
  );
};
