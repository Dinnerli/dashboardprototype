import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Info, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";

const EngagementActivitiesCard = () => {
  return (
    <Card className="w-full h-[555px] animate-slide-in-up shadow-sm" style={{
      animationDelay: '0.3s'
    }}>
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center w-full px-8 py-6 border-b border-[#E5E7EB]">
          <CardTitle>Engagement Activities</CardTitle>
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
            <div className="cursor-pointer">
              <span className="text-xs text-[#4F5A69] hover:text-[#338FFF] transition-colors">View Report</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap px-6 space-x-0 md:space-x-2 w-full py-4">
          {/* Active Users Stat */}
          <div className="flex items-center gap-5 p-5 bg-[#F5F6F8] rounded-lg flex-1 mb-2 md:mb-0">
            <div className="flex p-2.5 flex-col justify-center items-center">
              <div className="w-[2px] h-[35px] bg-[#338FFF]"></div>
            </div>
            <div className="flex w-full items-center">
              <div className="flex px-2.5 items-center gap-2.5 flex-1">
                <span className="text-base text-[#338FFF] font-semibold">
                  Active Users
                </span>
                <Info className="w-4 h-4 text-[#8C9BAC]" />
              </div>
              <div className="flex px-2.5 justify-end items-center gap-2.5 flex-1">
                <span className="text-2xl font-bold text-[#4F5A69]">237</span>
                <div className="flex items-center justify-end w-[66px]">
                  <span className="text-sm text-[#00D764] font-medium">
                    40%
                  </span>
                  <ArrowUp className="w-4 h-4 text-[#00D764]" />
                </div>
              </div>
            </div>
          </div>

          {/* Posts Stat */}
          <div className="flex items-center gap-5 p-5 flex-1 mb-2 md:mb-0">
            <div className="flex p-2.5 flex-col justify-center items-center">
              <div className="w-[2px] h-[35px] bg-[#F5F6F8]"></div>
            </div>
            <div className="flex w-full items-center">
              <div className="flex px-2.5 items-center gap-2.5 flex-1">
                <span className="text-base text-[#8C9BAC] font-semibold">
                  Posts
                </span>
                <Info className="w-4 h-4 text-[#8C9BAC]" />
              </div>
              <div className="flex px-2.5 justify-end items-center gap-2.5 flex-1">
                <span className="text-2xl font-bold text-[#4F5A69]">8</span>
                <div className="flex items-center justify-end w-[66px]">
                  <span className="text-sm text-[#ED5158] font-medium">
                    40%
                  </span>
                  <ArrowDown className="w-4 h-4 text-[#ED5158]" />
                </div>
              </div>
            </div>
          </div>

          {/* Comments Stat */}
          <div className="flex items-center gap-5 p-5 flex-1 mb-2 md:mb-0">
            <div className="flex p-2.5 flex-col justify-center items-center">
              <div className="w-[2px] h-[35px] bg-[#F5F6F8]"></div>
            </div>
            <div className="flex w-full items-center">
              <div className="flex px-2.5 items-center gap-2.5 flex-1">
                <span className="text-base text-[#8C9BAC] font-semibold">
                  Comments
                </span>
                <Info className="w-4 h-4 text-[#8C9BAC]" />
              </div>
              <div className="flex px-2.5 justify-end items-center gap-2.5 flex-1">
                <span className="text-2xl font-bold text-[#4F5A69]">8</span>
                <div className="flex items-center justify-end w-[66px]">
                  <span className="text-sm text-[#ED5158] font-medium">
                    40%
                  </span>
                  <ArrowDown className="w-4 h-4 text-[#ED5158]" />
                </div>
              </div>
            </div>
          </div>

          {/* Reactions Stat */}
          <div className="flex items-center gap-5 p-5 flex-1">
            <div className="flex p-2.5 flex-col justify-center items-center">
              <div className="w-[2px] h-[35px] bg-[#F5F6F8]"></div>
            </div>
            <div className="flex w-full items-center">
              <div className="flex px-2.5 items-center gap-2.5 flex-1">
                <span className="text-base text-[#8C9BAC] font-semibold">
                  Reactions
                </span>
                <Info className="w-4 h-4 text-[#8C9BAC]" />
              </div>
              <div className="flex px-2.5 justify-end items-center gap-2.5 flex-1">
                <span className="text-2xl font-bold text-[#4F5A69]">8</span>
                <div className="flex items-center justify-end w-[66px]">
                  <span className="text-sm text-[#ED5158] font-medium">
                    40%
                  </span>
                  <ArrowDown className="w-4 h-4 text-[#ED5158]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="flex-1 px-6 pb-4 relative py-[3px]">
          {/* Y-axis labels */}
          <div className="absolute left-6 top-0 h-full flex flex-col justify-between text-xs text-[#CDD1D7]">
            <div>500</div>
            <div>400</div>
            <div>300</div>
            <div>200</div>
            <div>100</div>
            <div>0</div>
          </div>
          
          {/* Chart grid lines */}
          <div className="ml-10 h-full relative">
            <div className="absolute w-full h-full flex flex-col justify-between">
              <div className="w-full h-[0.5px] bg-[#CDD1D7]"></div>
              <div className="w-full h-[0.5px] bg-[#CDD1D7]"></div>
              <div className="w-full h-[0.5px] bg-[#CDD1D7]"></div>
              <div className="w-full h-[0.5px] bg-[#CDD1D7]"></div>
              <div className="w-full h-[0.5px] bg-[#CDD1D7]"></div>
              <div className="w-full h-[0.5px] bg-[#CDD1D7]"></div>
            </div>
            
            {/* Chart SVG */}
            <div className="absolute inset-0">
              <svg width="100%" height="100%" viewBox="0 0 828 275" preserveAspectRatio="none">
                <g>
                  {/* Background lines */}
                  <path d="M0 107.688L138 133.002L276 184.052L414 51.9798L552 237.559L828 81.2738" stroke="#F5F6F8" strokeWidth="2" fill="none" />
                  <path d="M0 163.312L138 137.998L276 86.9479L414 219.02L552 33.4407L828 189.726" stroke="#F5F6F8" strokeWidth="2" fill="none" />
                  <path d="M0 157.989L138 133.67L276 108.293L414 235.177L552 33.2198L828 183.366" stroke="#F5F6F8" strokeWidth="2" fill="none" />
                  
                  {/* Main blue line */}
                  <path d="M0 113.011L138 229L276 162.707L414 35.8236L552 237.78L828 87.6346" stroke="#338FFF" strokeWidth="2" fill="none" />
                </g>
              </svg>
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="mt-2 ml-10 flex justify-between text-xs text-[#CDD1D7]">
            <div>Jan</div>
            <div>Feb</div>
            <div>Mar</div>
            <div>Apr</div>
            <div>May</div>
            <div>June</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EngagementActivitiesCard;
