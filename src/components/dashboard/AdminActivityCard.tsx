
import { Card } from "@/components/ui/card";
import { Info, ArrowUp } from "lucide-react";

const AdminActivityCard = () => {
  return (
    <Card className="w-full animate-slide-in-up shadow-sm" style={{ animationDelay: '0.4s' }}>
      <div className="px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2.5 flex-1">
          <span className="font-bold text-[22px] text-[#233143]">Admin Activity</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.04993 7.57495H13.9499C14.7749 7.57495 15.4499 8.24995 15.4499 9.07495V10.725C15.4499 11.325 15.0749 12.075 14.6999 12.45L11.4749 15.3C11.0249 15.675 10.7249 16.425 10.7249 17.025V20.25C10.7249 20.7 10.4249 21.3 10.0499 21.525L8.99993 22.2C8.02493 22.8 6.67493 22.125 6.67493 20.925V16.95C6.67493 16.425 6.37493 15.75 6.07493 15.375L3.22493 12.375C2.84993 12 2.54993 11.325 2.54993 10.875V9.14995C2.54993 8.24995 3.22493 7.57495 4.04993 7.57495Z" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.1975 7.57495L4.5 13.5" stroke="#8C9BAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-[#8C9BAC] border-b border-[#8C9BAC] px-2">View Report</span>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-[#CDD1D7]"></div>

      <div className="px-6 py-8 flex flex-col">
        {/* Stats section */}
        <div className="flex items-center justify-between w-full mb-12">
          {/* Course Assigned */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#003072]"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#8C9BAC]">Course Assigned</span>
                  <Info className="w-3 h-3 text-[#8C9BAC]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-[#4F5A69]">237</span>
                  <div className="flex items-center">
                    <span className="text-sm text-[#00D764]">40%</span>
                    <ArrowUp className="w-4 h-4 text-[#00D764]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* User Creation */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#F2F3F5]"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#8C9BAC]">User Creation</span>
                  <Info className="w-3 h-3 text-[#8C9BAC]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-[#4F5A69]">237</span>
                  <div className="flex items-center">
                    <span className="text-sm text-[#00D764]">40%</span>
                    <ArrowUp className="w-4 h-4 text-[#00D764]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Group Assigned */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#CDE4FF]"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#8C9BAC]">Group Assigned</span>
                  <Info className="w-3 h-3 text-[#8C9BAC]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-[#4F5A69]">237</span>
                  <div className="flex items-center">
                    <span className="text-sm text-[#00D764]">40%</span>
                    <ArrowUp className="w-4 h-4 text-[#00D764]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chart section */}
        <div className="w-full flex-1">
          <div className="w-full flex flex-col">
            {/* Bar chart */}
            <div className="flex justify-between items-end h-[250px] mb-2">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="flex items-end justify-center h-full">
                  <div className="w-10 flex flex-col items-center">
                    <div className="w-[10px] h-[28px] rounded-full bg-[#CDE4FF]"></div>
                    <div className="w-[10px] h-[28px] rounded-full bg-[#338FFF]"></div>
                    <div className="w-[10px] h-[29px] rounded-full bg-[#003072]"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chart x-axis */}
            <div className="h-px w-full bg-[#CDD1D7] mb-1"></div>
            <div className="flex justify-between w-full">
              <span className="text-[10px] text-[#CDD1D7]">Oct</span>
              <span className="text-[10px] text-[#CDD1D7]">Nov</span>
              <span className="text-[10px] text-[#CDD1D7]">Dec</span>
              <span className="text-[10px] text-[#CDD1D7]">Jan</span>
              <span className="text-[10px] text-[#CDD1D7]">Feb</span>
              <span className="text-[10px] text-[#CDD1D7]">Mar</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminActivityCard;
