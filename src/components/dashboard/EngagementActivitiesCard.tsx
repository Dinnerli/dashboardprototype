import React, { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Info, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import FilterDropdown from "./common/FilterDropdown";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import TrendIndicator from "./common/TrendIndicator";
import EngagementStat from "./EngagementStat";
import { useIsMobile } from "@/hooks/use-mobile";
import engagementActivitiesData from "@/Data/EngagementActivities.json";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const EngagementActivitiesCard = () => {
  const timeOptions = ["Last 60 Days", "Last 30 Days", "Last 15 Days", "Last 7 Days"];
  const typeOptions = ["All", "Completed", "In Progress", "Not Started"];
  const activities = engagementActivitiesData.engagementActivities;
  const [selectedStat, setSelectedStat] = useState<string | null>(activities[0].title);
  const [isAnimated, setIsAnimated] = useState(false);

  const isMobile = useIsMobile();

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
     <Card className="w-full h-full max-h-[500px] min-h-[420px] px-4 sm:px-5 md:px-6 overflow-hidden animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
  <CardHeader title="Engagement Activities" rightContent={isMobile ? null : <ViewReportButton />} />

  <div className="flex flex-col h-full">
    
    {/* Stats Section */}
    <div
      className={`stat-row flex items-center  gap-2.5  p-5 h-auto w-full overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory flex-nowrap md:overflow-visible md:flex-wrap md:snap-none md:scroll-auto`}
    >
      {activities.map((activity) => (
        <div key={activity.title} className="snap-start w-[70vw] min-w-[70vw] sm:w-auto sm:min-w-0">
          <EngagementStat
            title={activity.title}
            value={activity.value}
            percentage={activity.trend}
            isPositive={activity.rising}
            isActive={selectedStat === activity.title}
            onClick={() => handleStatClick(activity.title)}
          />
        </div>
      ))}
    </div>

    {/* Chart Section */}
    <div className="h-[250px] relative  ">
      

      {/* Chart Grid and LineChart */}
    
       
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={activities.find((a) => a.title === selectedStat)?.data || activities[0].data}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#8C9BAC', fontSize: 12 }} />
              <YAxis domain={[0, 500]} tick={{ fill: '#8C9BAC', fontSize: 12 }} ticks={[0, 100, 200, 300, 400, 500]} width={30} />
              <Tooltip
                contentStyle={{ backgroundColor: "#F2F3F5", border: "none", borderRadius: "8px" }}
                itemStyle={{ color: "#4F5A69", fontSize: 12 }}
                
                formatter={(value: number) => {
                  return [`${value}`, "Engagement Activities"];
                }}
              />
              <Line type="linear" dataKey="value" stroke="#338FFF" strokeWidth={2} dot={false} isAnimationActive={isAnimated} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      
      {/* X-axis labels removed, handled by recharts XAxis */}
    </div>
  </div>
</Card>

  );
};

export default EngagementActivitiesCard;
