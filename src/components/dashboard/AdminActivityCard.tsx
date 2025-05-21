import { Card, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useState } from "react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import TrendIndicator from "./common/TrendIndicator";

const AdminActivityCard = () => {
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const [selectedStat, setSelectedStat] = useState<'course' | 'user' | 'group' | null>(null);
  
  return (
    <Card className="w-full h-[450px] shadow-sm animate-slide-in-up bg-white overflow-hidden" style={{ animationDelay: '0.4s' }}>
      <CardHeader title="Admin Activity" rightContent={<ViewReportButton />} />
      <div className="flex flex-col h-full">
        
        {/* Stats section - updated to match the new design */}
        <div className="flex justify-between items-center p-2">
          {/* Course Assigned */}
          <div 
            className={`flex items-start cursor-pointer transition-all duration-200 hover:shadow-md rounded-lg p-2 ${
              selectedStat === 'course' ? 'shadow-md border border-[#338FFF]' : ''
            }`}
            onClick={() => setSelectedStat('course')}
          >
            <div className="flex p-[6px_4px_4px_4px] flex-col justify-center items-center">
              <div className={`w-[8px] h-[8px] rounded-full transition-colors duration-200 ${
                selectedStat === 'course' ? 'bg-[#338FFF]' : 'bg-[#003072]'
              }`}></div>
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="flex px-[0px_4px] items-center gap-1">
                <span className={`font-poppins text-[10px] transition-colors duration-200 ${
                  selectedStat === 'course' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'
                }`}>Course Assigned</span>
                <Info className="w-[8px] h-[8px] text-[#8C9BAC]" />
              </div>
              <div className="flex px-[0px_4px] items-center">
                <div className="flex flex-col justify-center items-start">
                  <span className="font-poppins text-[16px] font-bold text-[#4F5A69]">237</span>
                </div>
                <div className="flex justify-end items-center ml-1">
                  <TrendIndicator value="40%" isPositive={true} />
                </div>
              </div>
            </div>
          </div>
          
          {/* User Creation */}
          <div 
            className={`flex items-start cursor-pointer transition-all duration-200 hover:shadow-md rounded-lg p-2 ${
              selectedStat === 'user' ? 'shadow-md border border-[#338FFF]' : ''
            }`}
            onClick={() => setSelectedStat('user')}
          >
            <div className="flex p-[6px_4px_4px_4px] flex-col justify-center items-center">
              <div className={`w-[8px] h-[8px] rounded-full transition-colors duration-200 ${
                selectedStat === 'user' ? 'bg-[#338FFF]' : 'bg-[#F5F6F8]'
              }`}></div>
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="flex px-[0px_4px] items-center gap-1">
                <span className={`font-poppins text-[10px] transition-colors duration-200 ${
                  selectedStat === 'user' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'
                }`}>User Creation</span>
                <Info className="w-[8px] h-[8px] text-[#8C9BAC]" />
              </div>
              <div className="flex px-[0px_4px] items-center">
                <div className="flex flex-col justify-center items-start">
                  <span className="font-poppins text-[16px] font-bold text-[#4F5A69]">237</span>
                </div>
                <div className="flex justify-end items-center ml-1">
                  <TrendIndicator value="40%" isPositive={true} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Group Assigned */}
          <div 
            className={`flex items-start cursor-pointer transition-all duration-200 hover:shadow-md rounded-lg p-2 ${
              selectedStat === 'group' ? 'shadow-md border border-[#338FFF]' : ''
            }`}
            onClick={() => setSelectedStat('group')}
          >
            <div className="flex p-[6px_4px_4px_4px] flex-col justify-center items-center">
              <div className={`w-[8px] h-[8px] rounded-full transition-colors duration-200 ${
                selectedStat === 'group' ? 'bg-[#338FFF]' : 'bg-[#CDE4FF]'
              }`}></div>
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="flex px-[0px_4px] items-center gap-1">
                <span className={`font-poppins text-[10px] transition-colors duration-200 ${
                  selectedStat === 'group' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'
                }`}>Group Assigned</span>
                <Info className="w-[8px] h-[8px] text-[#8C9BAC]" />
              </div>
              <div className="flex px-[0px_4px] items-center">
                <div className="flex flex-col justify-center items-start">
                  <span className="font-poppins text-[16px] font-bold text-[#4F5A69]">237</span>
                </div>
                <div className="flex justify-end items-center ml-1">
                  <TrendIndicator value="40%" isPositive={true} />
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
