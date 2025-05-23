import { Card } from "@/components/ui/card";
import engagementActivitiesData from "@/Data/EngagementActivities.json";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CardHeader from "./CardHeader";
import EngagementStat from "./EngagementStat";
import ViewReportButton from "./ViewReportButton";

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
  interface ChartDataPoint {
    month: string;
    [activityTitle: string]: string | number;
  }

  const mergedChartData = () => {
    const merged: Record<string, ChartDataPoint> = {};

    activities.forEach((activity) => {
      activity.data.forEach(({ month, value }) => {
        if (!merged[month]) merged[month] = { month };
        merged[month][activity.title] = value;
      });
    });

    // Convert object to array and sort by month order
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return monthOrder.map((month) => merged[month] || { month });
  };

  return (
    <Card className="w-full h-full min-h-[420px] px-4 sm:px-5 md:px-6 overflow-hidden animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
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

  


          {/* Chart Grid and LineChart */}


          <div className="w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%" maxHeight={250} >
              <LineChart
                data={mergedChartData()}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#8C9BAC', fontSize: 12 }} />
                <YAxis domain={[0, 500]} tick={{ fill: '#8C9BAC', fontSize: 12 }} ticks={[0, 100, 200, 300, 400, 500]} width={30} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#F2F3F5", border: "none", borderRadius: "8px" }}
                  itemStyle={{ color: "#4F5A69", fontSize: 12 }}
                  formatter={(value: number) => [`${value}`, "Engagement Activities"]}
                  // Only show tooltip for the active line
                  filterNull={false}
                  wrapperStyle={{ zIndex: 1000 }}
                  content={({ active, payload, label }) => {
                    if (!active || !payload || !selectedStat) return null;
                    const activePayload = payload.find((p) => p.dataKey === selectedStat);
                    if (!activePayload) return null;
                    return (
                      <div style={{ backgroundColor: "#F2F3F5", borderRadius: 8, padding: 10 }}>
                        <div style={{ color: "#4F5A69", fontWeight: 600, fontSize: 16 }}>{activePayload.value}</div>
                        <div style={{ color: "#8C9BAC", fontSize: 12 }}>{selectedStat}</div>
                      </div>
                    );
                  }}
                />
                {/* Render non-active lines first (background) */}
                {activities.filter(a => a.title !== selectedStat).map(activity => (
                  <Line
                    key={activity.title}
                    type="linear"
                    dataKey={activity.title}
                    stroke="#F2F3F5"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={isAnimated}
                    pointerEvents="none"
                    hide={false}
                  />
                ))}
                {/* Render active line last (on top) */}
                {selectedStat && (
                  <Line
                    key={selectedStat}
                    type="linear"
                    dataKey={selectedStat}
                    stroke="#338FFF"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={isAnimated}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>

          </div>
        </div>

    </Card>

  );
};

export default EngagementActivitiesCard;
