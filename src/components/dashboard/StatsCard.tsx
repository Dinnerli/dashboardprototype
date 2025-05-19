import { ReactNode } from 'react';
import { InfoIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  percentChange: number;
  isValueSuffixed?: boolean;
  valueSuffix?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const StatsCard = ({ 
  title, 
  value, 
  percentChange, 
  isValueSuffixed = false,
  valueSuffix = '',
  isSelected = false,
  onClick
}: StatsCardProps) => {
  const isPositive = percentChange >= 0;
  const formattedChange = `${Math.abs(percentChange)}%`;
  
  return (
    <div 
      className={`flex h-auto px-5 py-2.5 flex-col justify-center items-start flex-[1_0_0] rounded-[10px] bg-white cursor-pointer 
        transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]
        ${isSelected 
          ? 'border-2 border-[#338FFF] shadow-md shadow-[#338FFF]/20' 
          : 'hover:border hover:border-[#338FFF]/50 hover:shadow-sm'
        }`}
      onClick={onClick}
    >
      <div className="flex flex-col justify-center items-start gap-2.5 w-full">
        {/* Title row */}
        <div className="flex items-center gap-2.5 w-full">
          <div className={`font-poppins font-medium text-xs transition-colors duration-300 ${
            isSelected ? 'text-[#338FFF]' : 'text-[#8C9BAC]'
          }`}>
            {title}
          </div>
          <svg 
            width="16" 
            height="17" 
            viewBox="0 0 16 17" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={`flex w-4 h-4 justify-center items-center transition-colors duration-300 ${
              isSelected ? 'text-[#338FFF]' : 'text-[#8C9BAC]'
            }`}
          >
            <path 
              d="M8 1.83334C11.6667 1.83334 14.6667 4.83334 14.6667 8.5C14.6667 12.1667 11.6667 15.1667 8 15.1667C4.33333 15.1667 1.33333 12.1667 1.33333 8.5C1.33333 4.83334 4.33333 1.83334 8 1.83334Z" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M8 11.1667V7.83334" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M7.99634 5.83333H8.00233" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Value row */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col justify-center items-start">
            <div className="text-[#4F5A69] font-poppins text-lg font-bold">
              {isValueSuffixed ? (
                <>
                  {value}
                  {valueSuffix && <span className="ml-0.5">{valueSuffix}</span>}
                </>
              ) : (
                value
              )}
            </div>
          </div>
          
          <div className="flex justify-end items-center">
            <div className={`text-right font-poppins text-xs font-medium transition-colors duration-300 ${
              isPositive ? 'text-[#00D764]' : 'text-[#ED5158]'
            }`}>
              {formattedChange}
            </div>
            <svg 
              width="10" 
              height="10" 
              viewBox="0 0 17 17" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className={`flex w-4 h-4 justify-center items-center flex-shrink-0 transition-transform duration-300 ${
              isPositive ? 'text-[#00D764]' : 'text-[#ED5158] rotate-180'
              }`}
            >
              <path 
              d="M12.7133 6.87999L8.66666 2.83333L4.62 6.87999" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeMiterlimit="10" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              />
              <path 
              d="M8.66666 14.1667V2.94667" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeMiterlimit="10" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
