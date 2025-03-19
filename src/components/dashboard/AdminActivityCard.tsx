
import { Card } from "@/components/ui/card";

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
        
        {/* Stats section */}
        <div className="grid grid-cols-3 gap-2 p-4">
          {/* Course Assigned */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#0054A6]"></div>
              <span className="text-xs text-[#4F5A69]">Course Assigned</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-base font-semibold text-[#233143]">237</span>
              <div className="flex items-center">
                <span className="text-[#00D764] text-[10px]">40%</span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0467 6.38004L8.00001 2.33337L3.95334 6.38004" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* User Creation */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#338FFF]"></div>
              <span className="text-xs text-[#4F5A69]">User Creation</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-base font-semibold text-[#233143]">237</span>
              <div className="flex items-center">
                <span className="text-[#00D764] text-[10px]">40%</span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0467 6.38004L8.00001 2.33337L3.95334 6.38004" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Group Assigned */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#CDE4FF]"></div>
              <span className="text-xs text-[#4F5A69]">Group Assigned</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-base font-semibold text-[#233143]">237</span>
              <div className="flex items-center">
                <span className="text-[#00D764] text-[10px]">40%</span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0467 6.38004L8.00001 2.33337L3.95334 6.38004" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
