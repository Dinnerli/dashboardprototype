
import { Card } from "@/components/ui/card";
import { Info, ChevronDown } from "lucide-react";

const EngagementActivitiesCard = () => {
  return (
    <Card className="w-full animate-slide-in-up shadow-sm" style={{ animationDelay: '0.3s' }}>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center w-full px-8 py-6 border-b border-[#CDD1D7] bg-white">
          <h3 className="text-lg font-semibold text-[#233143] font-poppins">Engagement Activities</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8C9BAC]">Filter by:</span>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-[#8C9BAC]">Last 60 Days</span>
                <ChevronDown className="w-4 h-4 text-[#8C9BAC]" />
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-[#8C9BAC]">All</span>
                <ChevronDown className="w-4 h-4 text-[#8C9BAC]" />
              </div>
            </div>
            <div className="cursor-pointer border-b border-[#4F5A69]">
              <span className="text-xs text-[#4F5A69]">View Report</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-5 flex flex-col h-[431px] justify-between">
          {/* Stats Row - Updated to display all four in one row with responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Active Users */}
            <div className="flex items-center gap-2 p-2.5 bg-[#F2F3F5] rounded-lg">
              <div className="flex p-2.5 flex-col justify-center items-center">
                <div className="w-2 h-[35px] bg-[#338FFF]"></div>
              </div>
              <div className="flex flex-col justify-center items-start">
                <div className="flex px-2.5 items-center gap-2.5">
                  <span className="font-bold text-[#338FFF] font-poppins text-base">Active Users</span>
                  <Info className="w-4 h-4 text-[#8C9BAC]" />
                </div>
                <div className="flex px-2.5 items-center gap-2.5">
                  <span className="font-bold text-2xl text-[#4F5A69] font-poppins">237</span>
                  <div className="flex w-[66px] justify-end items-center">
                    <span className="text-sm text-[#00D764] text-right font-poppins">40%</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex w-4 h-4 justify-center items-center flex-shrink-0">
                      <path d="M12.0467 6.38004L8.00004 2.33337L3.95337 6.38004" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 13.6667V2.44666" stroke="#00D764" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg">
              <div className="flex p-2.5 flex-col justify-center items-center">
                <div className="w-2 h-[35px] bg-[#F2F3F5]"></div>
              </div>
              <div className="flex flex-col justify-center items-start">
                <div className="flex px-2.5 items-center gap-2.5">
                  <span className="font-bold text-[#8C9BAC] font-poppins text-base">Posts</span>
                  <Info className="w-4 h-4 text-[#8C9BAC]" />
                </div>
                <div className="flex px-2.5 items-center gap-2.5">
                  <span className="font-bold text-2xl text-[#4F5A69] font-poppins">8</span>
                  <div className="flex w-[66px] justify-end items-center">
                    <span className="text-sm text-[#ED5158] text-right font-poppins">40%</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex w-4 h-4 justify-center items-center flex-shrink-0">
                      <path d="M12.0467 9.61996L8.00004 13.6666L3.95337 9.61996" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg">
              <div className="flex p-2.5 flex-col justify-center items-center">
                <div className="w-2 h-[35px] bg-[#F2F3F5]"></div>
              </div>
              <div className="flex flex-col justify-center items-start">
                <div className="flex px-2.5 items-center gap-2.5">
                  <span className="font-bold text-[#8C9BAC] font-poppins text-base">Comments</span>
                  <Info className="w-4 h-4 text-[#8C9BAC]" />
                </div>
                <div className="flex px-2.5 items-center gap-2.5">
                  <span className="font-bold text-2xl text-[#4F5A69] font-poppins">8</span>
                  <div className="flex w-[66px] justify-end items-center">
                    <span className="text-sm text-[#ED5158] text-right font-poppins">40%</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex w-4 h-4 justify-center items-center flex-shrink-0">
                      <path d="M12.0467 9.61996L8.00004 13.6666L3.95337 9.61996" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Reactions */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg">
              <div className="flex p-2.5 flex-col justify-center items-center">
                <div className="w-2 h-[35px] bg-[#F2F3F5]"></div>
              </div>
              <div className="flex flex-col justify-center items-start">
                <div className="flex px-2.5 items-center gap-2.5">
                  <span className="font-bold text-[#8C9BAC] font-poppins text-base">Reactions</span>
                  <Info className="w-4 h-4 text-[#8C9BAC]" />
                </div>
                <div className="flex px-2.5 items-center gap-2.5">
                  <span className="font-bold text-2xl text-[#4F5A69] font-poppins">8</span>
                  <div className="flex w-[66px] justify-end items-center">
                    <span className="text-sm text-[#ED5158] text-right font-poppins">40%</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex w-4 h-4 justify-center items-center flex-shrink-0">
                      <path d="M12.0467 9.61996L8.00004 13.6666L3.95337 9.61996" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 2.33334V13.5533" stroke="#ED5158" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Graph - Updated to match the provided image */}
          <div className="w-full h-[280px] mt-4 relative flex flex-col">
            {/* Y-axis grid lines and labels */}
            <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-between pointer-events-none">
              <div className="flex items-center text-xs text-[#AAAAAA] h-8">
                <span className="w-10 text-right pr-2">500</span>
                <div className="flex-1 border-t border-[#EEEEEE]"></div>
              </div>
              <div className="flex items-center text-xs text-[#AAAAAA] h-8">
                <span className="w-10 text-right pr-2">400</span>
                <div className="flex-1 border-t border-[#EEEEEE]"></div>
              </div>
              <div className="flex items-center text-xs text-[#AAAAAA] h-8">
                <span className="w-10 text-right pr-2">300</span>
                <div className="flex-1 border-t border-[#EEEEEE]"></div>
              </div>
              <div className="flex items-center text-xs text-[#AAAAAA] h-8">
                <span className="w-10 text-right pr-2">200</span>
                <div className="flex-1 border-t border-[#EEEEEE]"></div>
              </div>
              <div className="flex items-center text-xs text-[#AAAAAA] h-8">
                <span className="w-10 text-right pr-2">100</span>
                <div className="flex-1 border-t border-[#EEEEEE]"></div>
              </div>
              <div className="flex items-center text-xs text-[#AAAAAA] h-8">
                <span className="w-10 text-right pr-2">0</span>
                <div className="flex-1 border-t border-[#EEEEEE]"></div>
              </div>
            </div>
            
            {/* Graph visualization */}
            <div className="w-full h-full pl-10 relative">
              {/* Diagonal background grid lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="none">
                <defs>
                  <pattern id="diagonalGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M 0,80 L 80,0" fill="none" stroke="#F2F2F2" strokeWidth="1"/>
                    <path d="M 0,0 L 80,80" fill="none" stroke="#F2F2F2" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diagonalGrid)" />
              </svg>
              
              {/* Main blue line chart */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="none">
                <polyline 
                  points="0,100 133,180 266,140 400,60 533,200 666,40 800,80" 
                  fill="none" 
                  stroke="#338FFF" 
                  strokeWidth="2"
                  className="animate-dash"
                  strokeLinecap="round"
                  strokeLinejoin="round" 
                />
              </svg>
            </div>
            
            {/* X-axis labels */}
            <div className="flex justify-between items-center w-full pl-10 h-6 mt-1">
              <span className="text-xs text-[#AAAAAA]">Jan</span>
              <span className="text-xs text-[#AAAAAA]">Feb</span>
              <span className="text-xs text-[#AAAAAA]">Mar</span>
              <span className="text-xs text-[#AAAAAA]">Apr</span>
              <span className="text-xs text-[#AAAAAA]">May</span>
              <span className="text-xs text-[#AAAAAA]">June</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EngagementActivitiesCard;
