
import { ArrowUp, ArrowDown } from "lucide-react";

type StatIndicatorProps = { 
  value: string;
  isPositive: boolean;
};

const StatIndicator = ({ value, isPositive }: StatIndicatorProps) => {
  return (
    <div className="flex items-center justify-end">
      <span className={`text-xs ${isPositive ? 'text-[#00D764]' : 'text-[#ED5158]'}`}>
        {value}
      </span>
      {isPositive ? (
        <ArrowUp className="w-3 h-3 text-[#00D764]" stroke="#00D764" strokeWidth={1.5} />
      ) : (
        <ArrowDown className="w-3 h-3 text-[#ED5158]" stroke="#ED5158" strokeWidth={1.5} />
      )}
    </div>
  );
};

export default StatIndicator;
