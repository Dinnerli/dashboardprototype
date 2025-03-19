
import { Card } from "@/components/ui/card";
import { ChevronDown, Info, ArrowUp, ArrowDown } from "lucide-react";

const DevicesCard = () => {
  return (
    <Card className="w-full animate-slide-in-up shadow-sm h-[400px]" style={{ animationDelay: '0.4s' }}>
      <div className="px-6 py-6 flex justify-between items-center border-b border-[#CDD1D7]">
        <div className="flex items-center gap-2.5 flex-1">
          <span className="font-bold text-[22px] text-[#233143]">Devices</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.04993 7.57495H13.9499C14.7749 7.57495 15.4499 8.24995 15.4499 9.07495V10.725C15.4499 11.325 15.0749 12.075 14.6999 12.45L11.4749 15.3C11.0249 15.675 10.7249 16.425 10.7249 17.025V20.25C10.7249 20.7 10.4249 21.3 10.0499 21.525L8.99993 22.2C8.02493 22.8 6.67493 22.125 6.67493 20.925V16.95C6.67493 16.425 6.37493 15.75 6.07493 15.375L3.22493 12.375C2.84993 12 2.54993 11.325 2.54993 10.875V9.14995C2.54993 8.24995 3.22493 7.57495 4.04993 7.57495Z" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.1975 7.57495L4.5 13.5" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex items-center py-1.5 border-b border-[#8C9BAC]">
            <span className="text-xs text-[#8C9BAC] px-2">View Report</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-5 flex flex-col h-[330px] justify-between">
        {/* Device options section */}
        <div className="flex items-center gap-4 px-2">
          {/* Desktop Option - Active */}
          <div className="flex items-center gap-2.5 p-2.5 bg-[#F2F3F5] rounded-lg flex-1">
            {/* Blue indicator */}
            <div className="flex justify-center items-center px-2.5">
              <div className="w-0.5 h-[35px] bg-[#338FFF]"></div>
            </div>
            
            <div className="flex flex-col">
              {/* Title row */}
              <div className="flex items-center gap-2.5 px-2.5">
                <span className="font-bold text-base text-[#338FFF]">Desktop</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1.33329C11.6667 1.33329 14.6667 4.33329 14.6667 7.99996C14.6667 11.6666 11.6667 14.6666 8 14.6666C4.33333 14.6666 1.33333 11.6666 1.33333 7.99996C1.33333 4.33329 4.33333 1.33329 8 1.33329Z" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 10.6666V7.33329" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.99634 5.33337H8.00233" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {/* Stats row */}
              <div className="flex items-center gap-2.5 px-2.5">
                <span className="font-bold text-2xl text-[#4F5A69]">77%</span>
                <div className="flex items-center justify-end w-[66px]">
                  <span className="text-sm text-[#00D764]">40%</span>
                  <ArrowUp className="w-4 h-4 text-[#00D764]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Option - Inactive */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg flex-1">
            {/* Gray indicator */}
            <div className="flex justify-center items-center px-2.5">
              <div className="w-0.5 h-[35px] bg-[#F2F3F5]"></div>
            </div>
            
            <div className="flex flex-col">
              {/* Title row */}
              <div className="flex items-center gap-2.5 px-2.5">
                <span className="font-bold text-base text-[#8C9BAC]">Mobile</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.00001 1.33329C11.6667 1.33329 14.6667 4.33329 14.6667 7.99996C14.6667 11.6666 11.6667 14.6666 8.00001 14.6666C4.33334 14.6666 1.33334 11.6666 1.33334 7.99996C1.33334 4.33329 4.33334 1.33329 8.00001 1.33329Z" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 10.6666V7.33329" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.99634 5.33337H8.00233" stroke="#8C9BAC" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {/* Stats row */}
              <div className="flex items-center gap-2.5 px-2.5">
                <span className="font-bold text-2xl text-[#4F5A69]">23%</span>
                <div className="flex items-center justify-end w-[66px]">
                  <span className="text-sm text-[#ED5158]">40%</span>
                  <ArrowDown className="w-4 h-4 text-[#ED5158]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Graph section */}
        <div className="flex justify-center items-center h-[200px]">
          <svg width="220" height="200" viewBox="0 0 301 287" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40.5419 128.327C44.2098 101.746 57.3819 77.394 77.6206 59.7766C97.8594 42.1592 123.795 32.4693 150.627 32.5001" stroke="#F2F3F5" strokeWidth="40"/>
            <path d="M150.5 32.5C173.093 32.5 195.148 39.3942 213.718 52.2617C232.289 65.1291 246.491 83.3571 254.427 104.51C262.363 125.664 263.655 148.735 258.13 170.642C252.606 192.549 240.528 212.249 223.51 227.109C206.493 241.97 185.345 251.283 162.894 253.806C140.442 256.329 117.755 251.94 97.8642 241.227C77.973 230.513 61.8246 213.985 51.5764 193.85C41.3282 173.715 37.4682 150.932 40.512 128.546" stroke="#338FFF" strokeWidth="40" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default DevicesCard;
