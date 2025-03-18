
import { ReactNode } from 'react';
import { InfoIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  percentChange: number;
  isValueSuffixed?: boolean;
  valueSuffix?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  percentChange, 
  isValueSuffixed = false,
  valueSuffix = '' 
}: StatsCardProps) => {
  const isPositive = percentChange >= 0;
  const formattedChange = `${Math.abs(percentChange).toFixed(1)}%`;
  
  return (
    <div className="flex flex-col py-2 px-5 h-[95px] rounded-lg bg-white shadow-sm">
      <div className="flex items-start gap-5 w-full">
        <div className="text-black font-poppins text-sm font-medium leading-6">
          {title}
        </div>
        <InfoIcon className="w-4 h-4 text-[#B3B3B3]" />
      </div>
      
      <div className="flex justify-between items-center w-full mt-auto">
        <div className="text-[#616161] font-poppins font-bold">
          {isValueSuffixed ? (
            <>
              <span className="text-xl">{value}</span>
              {valueSuffix && <span className="text-base ml-0.5">{valueSuffix}</span>}
            </>
          ) : (
            <span className="text-xl">{value}</span>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <div 
            className={`text-right font-poppins text-sm font-bold ${
              isPositive ? 'text-[#019230]' : 'text-[#F10045]'
            }`}
          >
            {formattedChange}
          </div>
          
          {isPositive ? (
            <svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M12.7135 7.14652L8.66678 3.09985L4.62012 7.14652" 
                stroke="#019230" 
                strokeWidth="1.5" 
                strokeMiterlimit="10" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M8.66675 14.4334V3.21338" 
                stroke="#019230" 
                strokeWidth="1.5" 
                strokeMiterlimit="10" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M12.7135 10.3867L8.66678 14.4333L4.62012 10.3867" 
                stroke="#F10045" 
                strokeWidth="1.5" 
                strokeMiterlimit="10" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M8.66675 3.09982V14.3198" 
                stroke="#F10045" 
                strokeWidth="1.5" 
                strokeMiterlimit="10" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
