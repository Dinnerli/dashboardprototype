import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSocialActiveUsers } from "@/hooks/useSocialActiveUsers";
import { useSocialWallStats } from "@/hooks/useSocialWallStats";
import { useEffect, useState, useRef } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CardHeader from "./CardHeader";
import EngagementStat from "./EngagementStat";
import ViewReportButton from "./ViewReportButton";
import EmptyState from "./EmptyState";
import EngagementActivitiesCardSkeleton from "../Skeletons/EngagementActivitiesCard.skeleton";
import styles from "./EngagementActivitiesCard.module.css";

interface EngagementActivitiesCardProps {
  startDate?: string;
  endDate?: string;
  department?: string;
}

const EngagementActivitiesCard = ({ startDate, endDate, department }: EngagementActivitiesCardProps) => {  // Default date range if not provided
  const defaultEndDate = new Date().toISOString().slice(0, 10);
  const defaultStartDate = new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  
  const effectiveStartDate = startDate || defaultStartDate;
  const effectiveEndDate = endDate || defaultEndDate;

  // Fetch data from APIs
  const { data: socialWallStats, loading: wallLoading, error: wallError } = useSocialWallStats({
    startDate: effectiveStartDate,
    endDate: effectiveEndDate,
    department,
  });

  const { data: activeUsersData, loading: usersLoading, error: usersError } = useSocialActiveUsers({
    startDate: effectiveStartDate,
    endDate: effectiveEndDate,
    department,
  });

  // Combine all stats including active users
  const allActivities = socialWallStats ? [
    ...(activeUsersData ? [activeUsersData] : []),
    ...socialWallStats
  ] : [];
  const [selectedStat, setSelectedStat] = useState<string>('');
  const [isAnimated, setIsAnimated] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  // Add drag scrolling functionality
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Scroll speed multiplier
      container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    // Add touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      isDown = false;
    };

    // Add event listeners
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    // Set initial cursor
    container.style.cursor = 'grab';

    // Cleanup
    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  // Set initial selected stat when data loads
  useEffect(() => {
    const combinedActivities = socialWallStats ? [
      ...(activeUsersData ? [activeUsersData] : []),
      ...socialWallStats
    ] : [];
    
    if (combinedActivities.length > 0 && !selectedStat) {
      setSelectedStat(combinedActivities[0].title);
    }
  }, [socialWallStats, activeUsersData, selectedStat]);

  useEffect(() => {
    // Trigger animation after a small delay to ensure the component is mounted
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStatClick = (statName: string) => {
    if (selectedStat !== statName) {
      setSelectedStat(statName);
    }
  };

  interface ChartDataPoint {
    date: string;
    [activityTitle: string]: string | number;
  }
  const mergedChartData = () => {
    if (!socialWallStats) return [];

    const merged: Record<string, ChartDataPoint> = {};
    const allDates = new Set<string>();

    // Collect Social Wall stats
    socialWallStats.forEach((activity) => {
      activity.chartValues.forEach(({ name, value }) => {
        allDates.add(name);
        if (!merged[name]) merged[name] = { date: name };
        merged[name][activity.title] = value;
      });
    });

    // Collect Active Users stats if chart values exist
    if (activeUsersData?.chartValues?.length) {
      activeUsersData.chartValues.forEach(({ name, value }) => {
        allDates.add(name);
        if (!merged[name]) merged[name] = { date: name };
        merged[name][activeUsersData.title] = value;
      });
    } else if (activeUsersData) {
      // Flat series fallback
      allDates.forEach((date) => {
        if (!merged[date]) merged[date] = { date };
        merged[date][activeUsersData.title] = activeUsersData.value;
      });
    }

    // Convert to array and sort by date
    return Array.from(allDates)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((date) => merged[date]);
  };
  // Prepare chart data and dynamic axes
  const chartData = mergedChartData();
  // Determine Y axis range dynamically
  const yValues = chartData.flatMap(point => allActivities.map(act => Number(point[act.title] || 0)));
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  const yDomain: [number, number] = [yMin > 0 ? 0 : yMin, yMax];
  // X axis ticks from date string
  const xTicks = chartData.map(point => point.date);

  // Show loading state
  if (wallLoading || usersLoading) {
    return <EngagementActivitiesCardSkeleton />;
  }

  // Show error state
  if (wallError || usersError) {
    return (
      <Card className="w-full h-full animate-slide-in-up p-4 sm:p-5 md:p-6" style={{ animationDelay: '0.2s' }}>
        <CardHeader title="Social Wall Activities"  />
        <CardContent className={isMobile ? 'p-0 pt-2' : 'p-0'}>
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">Error: {wallError || usersError}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Check if all stats are 0 (empty state)
  const hasNoData = allActivities.length === 0 || allActivities.every(activity => activity.value === 0);

  // Show empty state when all stats are 0
  if (hasNoData) {
    return (
      <Card className="w-full h-full animate-slide-in-up p-4 sm:p-5 md:p-6" style={{ animationDelay: '0.2s' }}>
        <CardHeader title="Social Wall Activities"  />
        <CardContent className={isMobile ? 'p-0 pt-2' : 'p-0'}>
          <EmptyState cardName="Social Wall Activities" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="w-full h-full animate-slide-in-up p-4 sm:p-5 md:p-6" style={{ animationDelay: '0.2s' }}>
      <CardHeader title="Social Wall Activities"  />
      <CardContent className={isMobile ? 'p-0 pt-2' : 'p-0'}>
        <div className="flex flex-col justify-between h-full gap-6 ">        {/* Stats Section */}
        <div
          ref={scrollContainerRef}
          className={`flex items-center p-2.5 h-auto w-full overflow-x-auto hide-scrollbar scroll-smooth flex-nowrap ${styles['engagement-stat-row']}`}
        >
          {allActivities.map((activity) => (
            <div key={activity.title} className="flex-shrink-0 min-w-fit">
              <EngagementStat
                title={activity.title}
                value={activity.value}
                percentage={activity.trend}
                tooltip={`${activity.title} engagement statistics`}
                isPositive={activity.rising}
                isActive={selectedStat === activity.title}
                onClick={() => handleStatClick(activity.title)}
              />
            </div>
          ))}
        </div>

        {/* Chart Grid and LineChart */}
        <div className="w-full h-[250px] sm:h-[250px] flex items-end justify-center"> {/* Fixed height for mobile and desktop */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              
            >              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                ticks={xTicks}
                interval={0}
                tick={{ fill: '#CDD1D7', fontSize: 12 }}
                axisLine={{ stroke: '#CDD1D7' }}
                tickLine={{ stroke: '#CDD1D7' }}
              />
              <YAxis
                domain={yDomain}
                tick={{ fill: '#CDD1D7', fontSize: 12 }}
                width={30}
                axisLine={{ stroke: '#CDD1D7' }}
                tickLine={{ stroke: '#CDD1D7' }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#F2F3F5", border: "none", borderRadius: "8px" }}
                itemStyle={{ color: "#4F5A69", fontSize: 12 }}
                formatter={(value: number) => [`${value}`, "Engagement Activities"]}
                filterNull={false}
                wrapperStyle={{ zIndex: 1000 }}                content={({ active, payload, label }) => {
                  if (!active || !payload || !selectedStat) return null;
                  const activePayload = payload.find((p) => p.dataKey === selectedStat);
                  if (!activePayload) return null;
                  return (
                    <div className={styles['engagement-tooltip']}>
                      <div className={styles['engagement-tooltip-value']}>{activePayload.value}</div>
                      <div className={styles['engagement-tooltip-title']}>{selectedStat}</div>
                    </div>
                  );
                }}
              />              {/* Render non-active lines first (background) */}
              {allActivities.filter(a => a.title !== selectedStat).map(activity => (
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
              {selectedStat && allActivities.some(a => a.title === selectedStat) && (
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
      </CardContent>
    </Card>
  );
};

export default EngagementActivitiesCard;
