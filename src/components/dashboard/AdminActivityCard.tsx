
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

const AdminActivityCard = () => {
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  
  return (
    <Card className="w-full h-[450px] animate-slide-in-up shadow-sm overflow-hidden" style={{ animationDelay: '0.4s' }}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#E5E7EA]">
          <h3 className="font-bold text-lg text-[#233143]">Admin Activity</h3>
          <div className="flex items-center gap-2">
            {/* Filter icon */}
            <div className="flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.4 2.1H18.6C19.7 2.1 20.6 3 20.6 4.1V6.3C20.6 7.1 20.1 8.1 19.6 8.6L14.3 13.2C13.7 13.7 13.3 14.7 13.3 15.5V19.5C13.3 20.1 12.9 20.9 12.4 21.2L11 22.1C9.6 22.9 7.8 21.9 7.8 20.2V15.4C7.8 14.7 7.4 13.8 7 13.3L2.9 9C2.4 8.5 2 7.6 2 7V4.2C2 3 2.9 2.1 4 2.1H5.5H5.4Z" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* View Report link */}
            <div className="flex items-center border-b border-[#8C9BAC]">
              <span className="text-xs text-[#8C9BAC]">View Report</span>
            </div>
          </div>
        </div>
        
        {/* Stats section - updated to match the new design */}
        <div className="flex justify-between items-center p-2">
          {/* Course Assigned */}
          <div className="flex items-start">
            <div className="flex p-[8px_5px_5px_5px] flex-col justify-center items-center">
              <div className="w-[10px] h-[10px] rounded-full bg-[#003072]"></div>
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="flex px-[0px_5px] items-center gap-1">
                <span className="font-poppins text-xs text-[#8C9BAC]">Course Assigned</span>
                <Info className="w-[10px] h-[10px] text-[#8C9BAC]" />
              </div>
              <div className="flex px-[0px_5px] items-center">
                <div className="flex flex-col justify-center items-start">
                  <span className="font-poppins text-[20px] font-bold text-[#4F5A69]">237</span>
                </div>
                <div className="flex justify-end items-center ml-2">
                  <span className="text-[#00D764] text-right font-poppins text-[14px]">40%</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0466 6.38004L7.99998 2.33337L3.95331 6.38004" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* User Creation */}
          <div className="flex items-start">
            <div className="flex p-[8px_5px_5px_5px] flex-col justify-center items-center">
              <div className="w-[10px] h-[10px] rounded-full bg-[#F2F3F5]"></div>
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="flex px-[0px_5px] items-center gap-1">
                <span className="font-poppins text-xs text-[#8C9BAC]">User Creation</span>
                <Info className="w-[10px] h-[10px] text-[#8C9BAC]" />
              </div>
              <div className="flex px-[0px_5px] items-center">
                <div className="flex flex-col justify-center items-start">
                  <span className="font-poppins text-[20px] font-bold text-[#4F5A69]">237</span>
                </div>
                <div className="flex justify-end items-center ml-2">
                  <span className="text-[#00D764] text-right font-poppins text-[14px]">40%</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0466 6.38004L7.99998 2.33337L3.95331 6.38004" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Group Assigned */}
          <div className="flex items-start">
            <div className="flex p-[8px_5px_5px_5px] flex-col justify-center items-center">
              <div className="w-[10px] h-[10px] rounded-full bg-[#CDE4FF]"></div>
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="flex px-[0px_5px] items-center gap-1">
                <span className="font-poppins text-xs text-[#8C9BAC]">Group Assigned</span>
                <Info className="w-[10px] h-[10px] text-[#8C9BAC]" />
              </div>
              <div className="flex px-[0px_5px] items-center">
                <div className="flex flex-col justify-center items-start">
                  <span className="font-poppins text-[20px] font-bold text-[#4F5A69]">237</span>
                </div>
                <div className="flex justify-end items-center ml-2">
                  <span className="text-[#00D764] text-right font-poppins text-[14px]">40%</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0466 6.38004L7.99998 2.33337L3.95331 6.38004" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chart */}
        <div className="flex-1 px-4 pb-4 flex items-end">
          <div className="w-full h-[200px] flex items-end justify-between">
            {months.map((month, index) => (
              <div key={month} className="flex flex-col items-center justify-end h-full">
                {/* Light blue bar */}
                <div className="w-2 bg-[#CDE4FF] rounded-t-sm" style={{ height: `${30 + Math.random() * 20}px` }}></div>
                
                {/* Medium blue bar */}
                <div className="w-2 bg-[#338FFF] rounded-none" style={{ height: `${40 + Math.random() * 30}px`, marginTop: '2px' }}></div>
                
                {/* Dark blue bar */}
                <div className="w-2 bg-[#0054A6] rounded-none" style={{ height: `${50 + Math.random() * 40}px`, marginTop: '2px' }}></div>
                
                {/* Month label */}
                <span className="text-[10px] text-[#8C9BAC] mt-2">{month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminActivityCard;
