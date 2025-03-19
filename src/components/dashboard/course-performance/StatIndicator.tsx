
import React from "react";
import { ArrowUp } from "lucide-react";

type StatIndicatorProps = {
  value: string;
  isPositive: boolean;
};

const StatIndicator = ({ value, isPositive }: StatIndicatorProps) => {
  return (
    <div className="flex items-center justify-end w-[66px]">
      <span className="text-sm text-[#00D764] font-medium">
        {value}
      </span>
      <ArrowUp className="w-4 h-4 text-[#00D764]" stroke="#00D764" strokeWidth={1.5} />
    </div>
  );
};

export default StatIndicator;
