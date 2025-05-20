import React, { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Info, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import FilterDropdown from "./common/FilterDropdown";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";

const EngagementActivitiesCard = () => {
  const timeOptions = ["Last 60 Days", "Last 30 Days", "Last 15 Days", "Last 7 Days"];
  const typeOptions = ["All", "Completed", "In Progress", "Not Started"];
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after a small delay to ensure the component is mounted
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStatClick = (statName: string) => {
    setSelectedStat(selectedStat === statName ? null : statName);
  };

  return (
    <Card className="w-full h-[555px] animate-slide-in-up shadow-sm overflow-hidden bg-white px-6" style={{
      animationDelay: '0.3s'
    }}>
      <CardHeader title="Engagement Activities" rightContent={<ViewReportButton />}/>
      <div className="w-full h-full flex flex-col">
        

        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-4 py-6">
          {/* Active Users Stat */}
          <div 
            className={`bg-[#F8F9FA] rounded-lg p-4 relative cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]
              ${selectedStat === 'Active Users' 
                ? 'border-2 border-[#338FFF] shadow-md shadow-[#338FFF]/20' 
                : 'hover:border hover:border-[#338FFF]/50 hover:shadow-sm'
              }`}
            onClick={() => handleStatClick('Active Users')}
          >
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r transition-colors duration-300
              ${selectedStat === 'Active Users' ? 'bg-[#338FFF]' : 'bg-transparent'}`}
            ></div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 mb-2">
                <span className={`font-medium transition-colors duration-300
                  ${selectedStat === 'Active Users' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'}`}
                >
                  Active Users
                </span>
                <Info className={`w-4 h-4 transition-colors duration-300
                  ${selectedStat === 'Active Users' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'}`}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#4F5A69]">237</span>
                <div className="flex items-center gap-1">
                  <span className="text-[#00D764]">40%</span>
                  <ArrowUp className="w-4 h-4 text-[#00D764]" />
                </div>
              </div>
            </div>
          </div>

          {/* Posts Stat */}
          <div 
            className={`bg-white rounded-lg p-4 relative cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]
              ${selectedStat === 'Posts' 
                ? 'border-2 border-[#338FFF] shadow-md shadow-[#338FFF]/20' 
                : 'hover:border hover:border-[#338FFF]/50 hover:shadow-sm'
              }`}
            onClick={() => handleStatClick('Posts')}
          >
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r transition-colors duration-300
              ${selectedStat === 'Posts' ? 'bg-[#338FFF]' : 'bg-transparent'}`}
            ></div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 mb-2">
                <span className={`font-medium transition-colors duration-300
                  ${selectedStat === 'Posts' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'}`}
                >
                  Posts
                </span>
                <Info className={`w-4 h-4 transition-colors duration-300
                  ${selectedStat === 'Posts' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'}`}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#4F5A69]">8</span>
                <div className="flex items-center gap-1">
                  <span className="text-[#ED5158]">40%</span>
                  <ArrowDown className="w-4 h-4 text-[#ED5158]" />
                </div>
              </div>
            </div>
          </div>

          {/* Comments Stat */}
          <div 
            className={`bg-white rounded-lg p-4 relative cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]
              ${selectedStat === 'Comments' 
                ? 'border-2 border-[#338FFF] shadow-md shadow-[#338FFF]/20' 
                : 'hover:border hover:border-[#338FFF]/50 hover:shadow-sm'
              }`}
            onClick={() => handleStatClick('Comments')}
          >
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r transition-colors duration-300
              ${selectedStat === 'Comments' ? 'bg-[#338FFF]' : 'bg-transparent'}`}
            ></div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 mb-2">
                <span className={`font-medium transition-colors duration-300
                  ${selectedStat === 'Comments' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'}`}
                >
                  Comments
                </span>
                <Info className={`w-4 h-4 transition-colors duration-300
                  ${selectedStat === 'Comments' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'}`}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#4F5A69]">8</span>
                <div className="flex items-center gap-1">
                  <span className="text-[#ED5158]">40%</span>
                  <ArrowDown className="w-4 h-4 text-[#ED5158]" />
                </div>
              </div>
            </div>
          </div>

          {/* Reactions Stat */}
          <div 
            className={`bg-white rounded-lg p-4 relative cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]
              ${selectedStat === 'Reactions' 
                ? 'border-2 border-[#338FFF] shadow-md shadow-[#338FFF]/20' 
                : 'hover:border hover:border-[#338FFF]/50 hover:shadow-sm'
              }`}
            onClick={() => handleStatClick('Reactions')}
          >
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r transition-colors duration-300
              ${selectedStat === 'Reactions' ? 'bg-[#338FFF]' : 'bg-transparent'}`}
            ></div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 mb-2">
                <span className={`font-medium transition-colors duration-300
                  ${selectedStat === 'Reactions' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'}`}
                >
                  Reactions
                </span>
                <Info className={`w-4 h-4 transition-colors duration-300
                  ${selectedStat === 'Reactions' ? 'text-[#338FFF]' : 'text-[#8C9BAC]'}`}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#4F5A69]">8</span>
                <div className="flex items-center gap-1">
                  <span className="text-[#ED5158]">40%</span>
                  <ArrowDown className="w-4 h-4 text-[#ED5158]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="flex-1 relative overflow-hidden pt-2 px-2">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-4 h-[calc(100%-100px)] flex flex-col justify-between text-xs text-[#8C9BAC]">
            <div className="h-5 flex items-center">500</div>
            <div className="h-5 flex items-center">400</div>
            <div className="h-5 flex items-center">300</div>
            <div className="h-5 flex items-center">200</div>
            <div className="h-5 flex items-center">100</div>
            <div className="h-5 flex items-center">0</div>
          </div>
          
          {/* Chart grid lines */}
          <div className="ml-8 h-[calc(100%-100px)] relative mt-4 mr-4">
            <div className="absolute w-full h-full flex flex-col justify-between">
              <div className="w-full h-[1px] bg-[#F2F3F5]"></div>
              <div className="w-full h-[1px] bg-[#F2F3F5]"></div>
              <div className="w-full h-[1px] bg-[#F2F3F5]"></div>
              <div className="w-full h-[1px] bg-[#F2F3F5]"></div>
              <div className="w-full h-[1px] bg-[#F2F3F5]"></div>
              <div className="w-full h-[1px] bg-[#F2F3F5]"></div>
            </div>
            
            {/* Chart SVG */}
            <div className="absolute inset-0">
              <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 800 300">
                {/* Background lines - darker gray */}
                <path d="M0 150L160 180L320 120L480 200L640 80L800 180" stroke="#E5E7EB" strokeWidth="2" fill="none" />
                <path d="M0 120L160 200L320 80L480 180L640 120L800 150" stroke="#E5E7EB" strokeWidth="2" fill="none" />
                
                {/* Main blue line with animation */}
                <path 
                  d="M0 200L160 250L320 80L480 280L640 50L800 220" 
                  stroke="#338FFF" 
                  strokeWidth="2" 
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: "1000",
                    strokeDashoffset: isAnimated ? "0" : "1000",
                    transition: "stroke-dashoffset 1.5s ease-out",
                    transitionDelay: "0.3s"
                  }}
                />
              </svg>
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-6 left-8 right-4 flex justify-between text-xs text-[#8C9BAC]">
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
