import React, { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Info, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import FilterDropdown from "./common/FilterDropdown";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import TrendIndicator from "./common/TrendIndicator";
import EngagementStat from "./EngagementStat";

const EngagementActivitiesCard = () => {
  const timeOptions = ["Last 60 Days", "Last 30 Days", "Last 15 Days", "Last 7 Days"];
  const typeOptions = ["All", "Completed", "In Progress", "Not Started"];
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const chartData: Record<string, { path: string }> = {
    'Active Users': {
      path: 'M0 200L160 250L320 80L480 280L640 50L800 220',
    },
    'Posts': {
      path: 'M0 180L160 120L320 200L480 100L640 180L800 80',
    },
    'Comments': {
      path: 'M0 120L160 200L320 80L480 180L640 120L800 150',
    },
    'Reactions': {
      path: 'M0 150L160 180L320 120L480 200L640 80L800 180',
    },
    'default': {
      path: 'M0 200L160 250L320 80L480 280L640 50L800 220',
    },
  };

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
        <div className="grid grid-cols-4 gap-1 py-6">
          <EngagementStat
            title="Active Users"
            value={237}
            percentage="40%"
            isPositive={true}
            isActive={selectedStat === 'Active Users'}
            onClick={() => handleStatClick('Active Users')}
          />
          <EngagementStat
            title="Posts"
            value={8}
            percentage="40%"
            isPositive={false}
            isActive={selectedStat === 'Posts'}
            onClick={() => handleStatClick('Posts')}
          />
          <EngagementStat
            title="Comments"
            value={8}
            percentage="40%"
            isPositive={false}
            isActive={selectedStat === 'Comments'}
            onClick={() => handleStatClick('Comments')}
          />
          <EngagementStat
            title="Reactions"
            value={8}
            percentage="40%"
            isPositive={false}
            isActive={selectedStat === 'Reactions'}
            onClick={() => handleStatClick('Reactions')}
          />
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
                  d={chartData[selectedStat || 'default'].path}
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
