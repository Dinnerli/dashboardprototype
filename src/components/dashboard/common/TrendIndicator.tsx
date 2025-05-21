import React from "react";

interface TrendIndicatorProps {
  value: string | number;
  isPositive: boolean;
  className?: string;
}

const TrendIndicator: React.FC<TrendIndicatorProps> = ({ value, isPositive, className = "" }) => {
  return (
    <span className={`flex items-center gap-1 ${className}`}>
      <span className={isPositive ? "text-[#00D764] text-xs" : "text-[#ED5158] text-xs"}>{value}</span>
      {isPositive ? (
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.0467 9.62002L8.00004 13.6667L3.95337 9.62002" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      )}
    </span>
  );
};

export default TrendIndicator;
